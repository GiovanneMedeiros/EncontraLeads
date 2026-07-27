'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Logo } from '@/components/atoms';
import { ConnectionNetwork } from '@/components/molecules/ConnectionNetwork';
import { ProductMockup } from '@/components/molecules/ProductMockup';
import { useMouseSpotlight } from '@/hooks/useMouseSpotlight';
import { authService } from '@/services/auth.service';
import { onboardingService } from '@/services/onboarding.service';
import { PLANS } from '@/constants';
import {
  ArrowRight,
  MessageSquare,
  Zap,
  Users,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Clock,
  AlertTriangle,
  Route,
  CheckCircle2,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Recursos', href: '#features' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Planos', href: '/pricing' },
];

const BENEFITS = [
  { icon: MessageSquare, title: 'Atendimento 24h no WhatsApp', description: 'A IA nunca dorme.' },
  { icon: Zap, title: 'Qualificação automática', description: 'Sem preenchimento manual.' },
  { icon: Route, title: 'Distribuição inteligente', description: 'Lead certo, profissional certo.' },
  { icon: BarChart3, title: 'Métricas em tempo real', description: 'Toda a operação, um painel.' },
  { icon: ShieldCheck, title: 'Dados isolados por empresa', description: 'Multi-tenant e seguro.' },
];

const PROBLEMS = [
  {
    icon: Clock,
    title: 'Respostas lentas',
    description: 'Cliente manda mensagem e espera minutos ou horas por uma resposta.',
  },
  {
    icon: AlertTriangle,
    title: 'Leads perdidos',
    description: 'Sem qualificação nem organização, oportunidades somem na conversa.',
  },
  {
    icon: Users,
    title: 'Equipe sobrecarregada',
    description: 'Atendentes decidindo na mão quem fala com quem, sem critério.',
  },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Atendimento em tempo real',
    description: 'IA conversacional que entende o contexto e responde naturalmente pelo WhatsApp.',
    visual: 'chat' as const,
    span: true,
  },
  {
    icon: Zap,
    title: 'Qualificação automática',
    description: 'Cada conversa é qualificada em tempo real, sem depender de preenchimento manual.',
    visual: 'pipeline' as const,
    span: false,
  },
  {
    icon: Users,
    title: 'Distribuição inteligente',
    description: 'Encaminhamento automático para o profissional certo, respeitando fila e disponibilidade.',
    visual: 'routing' as const,
    span: false,
  },
  {
    icon: BarChart3,
    title: 'Analytics detalhado',
    description: 'Métricas de atendimento, conversão e equipe em um painel único.',
    visual: 'chart' as const,
    span: false,
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Conecte seu WhatsApp',
    description: 'Configuração em minutos, sem precisar de time técnico.',
  },
  {
    step: '02',
    icon: Sparkles,
    title: 'A IA atende e qualifica',
    description: 'Cada conversa é entendida, classificada e organizada automaticamente.',
  },
  {
    step: '03',
    icon: Users,
    title: 'Sua equipe recebe o lead certo',
    description: 'Distribuição automática para o profissional disponível e adequado.',
  },
];

function FeatureVisual({ visual }: { visual: 'chat' | 'pipeline' | 'routing' | 'chart' }) {
  if (visual === 'chat') {
    return (
      <div className="mt-5 space-y-2 rounded-xl border border-brand-border bg-brand-light p-3">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg rounded-tr-none bg-brand-emerald px-3 py-1.5 text-[11px] text-white">
            Tem horário amanhã?
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-3 py-1.5 text-[11px] text-brand-ink shadow-sm">
            Tenho sim! Posso te encaixar às 14h.
          </div>
        </div>
        <div className="flex items-center gap-1.5 pl-1 text-[10px] text-brand-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" />
          Atendimento ativo
        </div>
      </div>
    );
  }

  if (visual === 'pipeline') {
    const stages = ['Novo', 'Qualificando', 'Qualificado'];
    return (
      <div className="mt-5 rounded-xl border border-brand-border bg-brand-light p-3">
        <div className="flex items-center justify-between text-[10px] text-brand-slate">
          {stages.map((stage, index) => (
            <span key={stage} className={index === 2 ? 'font-medium text-brand-forest' : ''}>
              {stage}
            </span>
          ))}
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-border">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-emerald to-brand-mint"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    );
  }

  if (visual === 'routing') {
    const agents = [
      { name: 'Marina', active: false },
      { name: 'Carlos', active: true },
      { name: 'Beatriz', active: false },
    ];
    return (
      <div className="mt-5 space-y-1.5 rounded-xl border border-brand-border bg-brand-light p-3">
        {agents.map((agent) => (
          <div key={agent.name} className="flex items-center justify-between text-[11px]">
            <span className={agent.active ? 'font-medium text-brand-ink' : 'text-brand-slate'}>
              {agent.name}
            </span>
            {agent.active ? (
              <span className="rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-2 py-0.5 text-[10px] font-medium text-brand-forest">
                Próximo da vez
              </span>
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
            )}
          </div>
        ))}
      </div>
    );
  }

  const bars = [30, 55, 40, 70, 62, 85];
  return (
    <div className="mt-5 flex h-14 items-end gap-1.5 rounded-xl border border-brand-border bg-brand-light p-3">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="flex-1 rounded-t bg-gradient-to-t from-brand-emerald to-brand-mint"
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleHandledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGoogleCompleting, setIsGoogleCompleting] = useState(false);
  const spotlightRef = useMouseSpotlight();

  useEffect(() => {
    if (googleHandledRef.current) {
      return;
    }

    const code = searchParams?.get('code');
    const state = searchParams?.get('state');
    const error = searchParams?.get('error');

    if (!code && !error) {
      return;
    }

    googleHandledRef.current = true;

    if (error) {
      router.replace(`/auth/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (!code || !state) {
      router.replace('/auth/login?error=google_oauth_state_invalid');
      return;
    }

    const completeGoogleLogin = async () => {
      try {
        setIsGoogleCompleting(true);
        const response = await authService.exchangeGoogleCode(code, state);

        if (response.success) {
          const onboarding = await onboardingService.getState();
          if (onboarding.success && onboarding.data && !onboarding.data.progress.isCompleted) {
            router.replace('/onboarding');
          } else {
            router.replace('/dashboard');
          }
          return;
        }

        if (response.error?.code === 'GOOGLE_OAUTH_STATE_INVALID') {
          router.replace('/auth/login?error=google_oauth_state_invalid');
          return;
        }

        router.replace('/auth/login?error=google_oauth_failed');
      } catch {
        router.replace('/auth/login?error=google_oauth_failed');
      } finally {
        setIsGoogleCompleting(false);
      }
    };

    completeGoogleLogin();
  }, [router, searchParams]);

  useEffect(() => {
    const handleWindowScroll = () => setIsScrolled(window.scrollY > 8);
    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const cheapestMonthlyPrice = Math.min(
    ...PLANS.filter((plan) => plan.monthlyPrice != null).map((plan) => plan.monthlyPrice as number)
  );

  return (
    <div className="overflow-hidden bg-brand-bg">
      {isGoogleCompleting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-bg/90 backdrop-blur-md">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-gray">Encontra Leads</p>
            <h2 className="mt-3 text-xl font-semibold text-neutral-white">Finalizando login com Google</h2>
            <p className="mt-2 text-sm text-neutral-gray">Aguarde alguns segundos...</p>
          </div>
        </div>
      )}

      {/* Background com rede de conexão */}
      <ConnectionNetwork />

      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 mix-blend-screen"
        style={{
          background: `radial-gradient(circle 300px at var(--spotlight-x, 0px) var(--spotlight-y, 0px), rgba(24, 199, 122, 0.12) 0%, transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/5 bg-brand-bg/80 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Logo size="sm" textClassName="text-base sm:text-xl" />
            </motion.div>

            {/* Center links */}
            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-neutral-gray transition-colors duration-200 hover:text-neutral-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="md"
                  className="h-8 px-2 text-xs transition-all duration-200 hover:text-brand-mint sm:h-10 sm:px-4 sm:text-base"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/signup" aria-label="Testar Gratuitamente">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="brand"
                    size="md"
                    className="relative h-9 w-9 overflow-hidden rounded-full p-0 sm:h-10 sm:w-auto sm:rounded-lg sm:px-6"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="hidden sm:inline">Testar Gratuitamente</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 pt-40 pb-20 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 15% 20%, rgba(6, 78, 59, 0.35) 0%, transparent 45%), radial-gradient(circle at 85% 15%, rgba(6, 36, 43, 0.6) 0%, transparent 50%)',
          }}
        />

        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 px-4 py-2 text-sm font-medium text-brand-mint border border-brand-emerald/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-4 w-4" />
              </motion.div>
              Do primeiro contato ao atendimento certo.
            </motion.div>

            {/* Título */}
            <motion.div variants={itemVariants} className="mb-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                <span className="text-neutral-white">Transforme </span>
                <span className="bg-gradient-to-r from-brand-emerald to-brand-mint bg-clip-text text-transparent">
                  conversas
                </span>
                <span className="text-neutral-white"> em </span>
                <span className="bg-gradient-to-r from-brand-mint to-brand-emerald bg-clip-text text-transparent">
                  oportunidades.
                </span>
              </h1>
            </motion.div>

            {/* Descrição */}
            <motion.p variants={itemVariants} className="mb-8 text-xl text-neutral-gray">
              Organização, atendimento e distribuição de oportunidades em uma única
              plataforma. A IA cuida do primeiro contato, sua equipe cuida do resultado.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/auth/login">
                  <Button variant="brand" size="lg" className="flex w-full items-center gap-2 sm:w-auto group">
                    Acessar Dashboard
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/pricing">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full border border-white/15 text-neutral-white transition-all duration-300 hover:border-brand-emerald/50 hover:bg-white/5 sm:w-auto"
                  >
                    Ver planos
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust text */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-2 text-sm text-neutral-gray"
            >
              <ShieldCheck className="h-4 w-4 text-brand-emerald" />
              Sem cartão de crédito · Configuração em minutos
            </motion.div>
          </motion.div>

          {/* Product Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            <ProductMockup />
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="relative border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:justify-between">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-white">{benefit.title}</p>
                  <p className="text-xs text-neutral-gray">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative bg-brand-light px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-brand-ink sm:text-4xl">
              O atendimento manual não acompanha o crescimento do seu negócio
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-brand-slate">
              Quanto mais conversas chegam, mais difícil fica organizar, responder rápido e não
              perder oportunidades pelo caminho.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PROBLEMS.map((problem, index) => (
              <motion.div
                key={problem.title}
                className="rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-forest/10 text-brand-forest">
                  <problem.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 mb-2 text-lg font-semibold text-brand-ink">{problem.title}</h3>
                <p className="text-sm text-brand-slate">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-brand-light px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 text-brand-forest">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em]">Recursos</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold text-brand-ink sm:text-5xl">
              Tudo que sua operação precisa
            </h2>
            <p className="text-lg text-brand-slate">
              Uma plataforma para automatizar, organizar e escalar o atendimento da sua equipe
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`rounded-2xl border border-brand-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  feature.span ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 mb-2 text-lg font-semibold text-brand-ink">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-slate">{feature.description}</p>
                <FeatureVisual visual={feature.visual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mockup Showcase Section */}
      <section className="relative overflow-hidden bg-brand-bg px-4 py-24 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(6, 78, 59, 0.4) 0%, transparent 55%)',
          }}
        />

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-white sm:text-4xl">
              Veja como sua operação fica organizada
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-neutral-gray">
              Cada lead passa por um fluxo claro, do primeiro contato até o fechamento com o time certo.
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-bg-secondary to-brand-bg shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/5 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-emerald/60" />
              <span className="ml-3 text-xs font-medium text-neutral-gray">app.encontraleads.com/leads</span>
            </div>

            <div className="grid gap-4 p-5 text-left sm:grid-cols-3 sm:p-6">
              {[
                {
                  title: 'Novo',
                  items: ['Marina Alves', 'Pedro Costa'],
                  tone: 'text-neutral-gray',
                },
                {
                  title: 'Qualificando',
                  items: ['Carlos Souza'],
                  tone: 'text-brand-mint',
                },
                {
                  title: 'Qualificado',
                  items: ['Beatriz Lima', 'João Prado'],
                  tone: 'text-brand-emerald',
                },
              ].map((column) => (
                <div key={column.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <p className={`mb-3 text-xs font-semibold uppercase tracking-wide ${column.tone}`}>
                    {column.title}
                  </p>
                  <div className="space-y-2">
                    {column.items.map((name) => (
                      <div
                        key={name}
                        className="rounded-lg border border-white/5 bg-bg-secondary/80 px-3 py-2 text-xs text-neutral-white"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: CheckCircle2, label: 'Sem planilhas paralelas' },
              { icon: Route, label: 'Fila sempre em ordem' },
              { icon: BarChart3, label: 'Status visível em tempo real' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 text-sm text-neutral-gray">
                <item.icon className="h-4 w-4 text-brand-emerald" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="bg-brand-light px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold text-brand-ink sm:text-5xl">Como funciona</h2>
            <p className="text-lg text-brand-slate">Três passos para colocar sua operação no automático</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative rounded-2xl border border-brand-border bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
              >
                <span className="text-4xl font-bold text-brand-border">{step.step}</span>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-emerald/10 text-brand-emerald">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 mb-2 text-lg font-semibold text-brand-ink">{step.title}</h3>
                <p className="text-sm text-brand-slate">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="bg-brand-light px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl border border-brand-border bg-white p-8 shadow-sm sm:flex-row sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-forest">Planos</p>
            <h3 className="mt-1 text-2xl font-bold text-brand-ink">
              Planos a partir de R$ {cheapestMonthlyPrice}/mês
            </h3>
            <p className="mt-1 text-sm text-brand-slate">7 dias grátis. Cancele quando quiser.</p>
          </div>
          <Link href="/pricing">
            <Button variant="brand" size="lg" className="flex items-center gap-2 whitespace-nowrap group">
              Ver planos completos
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-brand-bg px-4 py-24 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(24, 199, 122, 0.12) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(6, 78, 59, 0.2) 0%, transparent 45%)',
          }}
        />

        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold text-neutral-white">
              Pronto para transformar seu negócio?
            </h2>
            <p className="mb-8 text-lg text-neutral-gray">
              Comece gratuitamente e veja os resultados em dias, não semanas.
            </p>
            <motion.div className="inline-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth/signup">
                <Button variant="brand" size="lg" className="flex items-center gap-2 group">
                  Começar Agora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-brand-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <Logo size="sm" className="mb-4" />
              <p className="text-sm text-neutral-gray">Transforme conversas em oportunidades.</p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-neutral-white">Produto</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-mint">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="transition-colors hover:text-brand-mint">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="transition-colors hover:text-brand-mint">
                    Recursos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-neutral-white">Empresa</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-neutral-white">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    Termos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-brand-mint">
                    LGPD
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-sm text-neutral-gray">
            <p>&copy; 2026 Encontra Leads. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
