import Image from 'next/image';
import { cn } from '@/lib/cn';

const ICON_NATURAL_WIDTH = 490;
const ICON_NATURAL_HEIGHT = 345;
const ICON_ASPECT = ICON_NATURAL_WIDTH / ICON_NATURAL_HEIGHT;

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

const SIZES: Record<NonNullable<LogoProps['size']>, { box: number; text: string }> = {
  sm: { box: 26, text: 'text-sm' },
  md: { box: 32, text: 'text-lg' },
  lg: { box: 40, text: 'text-xl' },
};

export function Logo({ size = 'md', showText = true, className, textClassName }: LogoProps) {
  const { box, text } = SIZES[size];
  const iconWidth = Math.round(box * ICON_ASPECT);

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1"
        style={{ height: box, width: iconWidth }}
      >
        <Image
          src="/logo-icon.png"
          alt={showText ? '' : 'Encontra Leads'}
          width={ICON_NATURAL_WIDTH}
          height={ICON_NATURAL_HEIGHT}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      {showText && (
        <span className={cn('font-bold text-neutral-white', text, textClassName)}>
          Encontra Leads
        </span>
      )}
    </span>
  );
}
