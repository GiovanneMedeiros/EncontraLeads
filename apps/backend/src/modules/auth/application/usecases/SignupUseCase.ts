/**
 * Auth Use Case - Signup
 */

import { Injectable, Inject } from '@nestjs/common';
import { IUseCase } from '@shared/domain/IUseCase';
import { Result } from '@shared/domain/Result';
import { PrismaService } from '@shared/infrastructure/database/PrismaService';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';
import { HashService } from '@shared/infrastructure/services/HashService';
import { TokenService } from '@shared/infrastructure/services/TokenService';
import { RegisterDTO, AuthResponseDTO } from '../dtos/AuthDTOs';

@Injectable()
export class SignupUseCase implements IUseCase<RegisterDTO, Result<AuthResponseDTO>> {
  constructor(
    @Inject('IUserRepository') private userRepository: IUserRepository,
    private prisma: PrismaService,
    private hashService: HashService,
    private tokenService: TokenService
  ) {}

  async execute(request: RegisterDTO): Promise<Result<AuthResponseDTO>> {
    const existingUser = await this.userRepository.findByEmailOnly(request.email);

    if (existingUser.isSuccess) {
      return Result.fail<AuthResponseDTO>('Este email já está cadastrado');
    }

    const company = await this.prisma.company.create({
      data: {
        name: `${request.firstName} ${request.lastName}`.trim(),
        slug: await this.generateUniqueSlug(request.email),
        email: request.email,
        billingEmail: request.email,
        country: 'BR',
        city: 'São Paulo',
        settings: {},
        metadata: {},
      },
    });

    const passwordHash = await this.hashService.hash(request.password);

    const user = User.create({
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      passwordHash,
      role: 'ADMIN' as any,
      status: 'ACTIVE' as any,
      tenantId: company.id,
    });

    const createdUserOrError = await this.userRepository.create(user);

    if (createdUserOrError.isFailure) {
      return Result.fail<AuthResponseDTO>('Não foi possível criar a conta');
    }

    const createdUser = createdUserOrError.getValue();

    const payload = {
      sub: createdUser.id.toString(),
      email: createdUser.email,
      tenantId: createdUser.tenantId,
      role: createdUser.role,
    };

    const response: AuthResponseDTO = {
      accessToken: this.tokenService.generateAccessToken(payload),
      refreshToken: this.tokenService.generateRefreshToken(payload),
      user: {
        id: createdUser.id.toString(),
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        role: createdUser.role,
        tenantId: createdUser.tenantId,
      },
    };

    return Result.ok<AuthResponseDTO>(response);
  }

  private async generateUniqueSlug(email: string): Promise<string> {
    const baseSlug =
      email
        .split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'hublaia';

    let slug = baseSlug;
    let suffix = 1;

    while (await this.prisma.company.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    return slug;
  }
}
