export const COLORS = {
  bg: {
    primary: '#0B1220',
    secondary: '#111827',
    tertiary: '#1F2937',
  },
  primary: {
    400: '#6366F1',
    500: '#4F46E5',
    600: '#4F46E5',
  },
  accent: {
    600: '#7C3AED',
  },
  status: {
    blue: '#3B82F6',
    yellow: '#F59E0B',
    green: '#10B981',
    gray: '#6B7280',
    red: '#EF4444',
  },
  neutral: {
    white: '#FFFFFF',
    gray: '#CBD5E1',
  },
};

export const STATUS_COLORS = {
  BLUE: 'bg-status-blue',
  YELLOW: 'bg-status-yellow',
  GREEN: 'bg-status-green',
  GRAY: 'bg-status-gray',
  RED: 'bg-status-red',
};

export const STATUS_LABELS = {
  BLUE: 'Cliente deseja falar',
  YELLOW: 'Em atendimento',
  GREEN: 'Lead qualificado',
  GRAY: 'Aguardando',
  RED: 'Perdido',
};

export const AGENT_STATUS = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  BUSY: 'Ocupado',
  AWAY: 'Ausente',
};

export const LEAD_STATUS = {
  NEW: 'Novo',
  IN_QUEUE: 'Na fila',
  ASSIGNED: 'Atribuído',
  CLOSED: 'Fechado',
};

export const TRIAL_DAYS = 7;

export type BillingCycle = 'monthly' | 'annual';

export interface Plan {
  id: 'essential' | 'professional' | 'business' | 'enterprise';
  name: string;
  description: string;
  /** null = no fixed price (custom / "Falar com especialista") */
  monthlyPrice: number | null;
  annualPrice: number | null;
  badge?: string;
  isHighlighted?: boolean;
  buttonText: string;
  features: string[];
  /**
   * Reserved for a future "founding customers" promotional pricing program.
   * Not active yet — no UI reads these fields today.
   */
  foundingMonthlyPrice?: number;
  foundingAnnualPrice?: number;
}

// Single source of truth for plan names, prices, and features.
// Launch pricing — not wired to any payment gateway yet.
export const PLANS: Plan[] = [
  {
    id: 'essential',
    name: 'Essencial',
    description: 'Para pequenos negócios que estão começando a automatizar seus atendimentos.',
    monthlyPrice: 49,
    annualPrice: 490,
    buttonText: 'Começar agora',
    features: [
      '1 número de WhatsApp',
      '1 usuário',
      'Agente de atendimento',
      'Qualificação básica de leads',
      'Encaminhamento de leads',
      'Classificação de conversas',
      'Limite de uso definido pelo sistema',
    ],
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Para empresas que querem automatizar o atendimento e organizar sua equipe.',
    monthlyPrice: 99,
    annualPrice: 990,
    badge: 'Mais escolhido',
    isHighlighted: true,
    buttonText: 'Começar agora',
    features: [
      'Tudo do Essencial',
      'Até 5 usuários',
      'Distribuição automática de leads',
      'Fila inteligente',
      'Distribuição por ordem de atendimento',
      'Alertas de atendimento humano',
      'Personalização do agente',
      'Maior limite de uso',
      'Relatórios básicos',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para empresas com equipes maiores e operações mais completas.',
    monthlyPrice: 199,
    annualPrice: 1990,
    buttonText: 'Começar agora',
    features: [
      'Tudo do Profissional',
      'Até 15 usuários',
      'Maior limite de uso',
      'Múltiplos atendentes',
      'Regras avançadas de distribuição',
      'Integrações',
      'Relatórios avançados',
      'Suporte prioritário',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para empresas maiores que precisam de uma solução personalizada.',
    monthlyPrice: null,
    annualPrice: null,
    buttonText: 'Falar com especialista',
    features: [
      'Tudo do Business',
      'Múltiplos números de WhatsApp',
      'Múltiplas unidades',
      'Integrações personalizadas',
      'IA personalizada',
      'Suporte dedicado',
      'SLA personalizado',
      'Implantação assistida',
    ],
  },
];

export const ANNUAL_SAVINGS_LABEL = 'Economize até 2 meses';

export function getPlanPrice(plan: Plan, cycle: BillingCycle): number | null {
  return cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
}

/** Returns the price to display: a number, or "Personalizado" for custom-priced plans. */
export function getPlanPriceDisplay(plan: Plan, cycle: BillingCycle): number | string {
  const price = getPlanPrice(plan, cycle);
  return price ?? 'Personalizado';
}

export function getPlanAnnualSavingsAmount(plan: Plan): number | null {
  if (plan.monthlyPrice == null || plan.annualPrice == null) return null;
  return plan.monthlyPrice * 12 - plan.annualPrice;
}
