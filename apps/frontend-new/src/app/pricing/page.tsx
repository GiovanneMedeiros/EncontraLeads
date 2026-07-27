'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Logo } from '@/components/atoms';
import { PricingCard } from '@/components/molecules/PricingCard';
import { PricingToggle } from '@/components/molecules/PricingToggle';
import { ComparisonTable } from '@/components/molecules/ComparisonTable';
import { FAQAccordion } from '@/components/molecules/FAQAccordion';
import { useMouseSpotlight } from '@/hooks/useMouseSpotlight';
import { ConnectionNetwork } from '@/components/molecules/ConnectionNetwork';
import { ArrowRight, Zap, ShieldCheck, Clock, Shield, Headphones } from 'lucide-react';
import {
  PLANS,
  TRIAL_DAYS,
  getPlanPriceDisplay,
  getPlanAnnualSavingsAmount,
} from '@/constants';

const FAQItems = [
  {
    question: 'Posso cancelar minha assinatura?',
    answer:
      'Sim! Você pode cancelar sua assinatura a qualquer momento. Sem compromissos de longo prazo. Sua assinatura será encerrada no final do período de cobrança.',
  },
  {
    question: 'Preciso contratar um plano anual?',
    answer:
      'Não, é totalmente opcional. Oferecemos tanto planos mensais quanto anuais. O plano anual oferece até 16% de economia em comparação com o plano mensal.',
  },
  {
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se você passar para um plano mais caro, será cobrada a diferença pró-rata. Se mudar para um plano mais barato, terá crédito para os próximos meses.',
  },
  {
    question: 'O Encontra Leads funciona para qualquer empresa?',
    answer:
      'O Encontra Leads foi desenvolvido para empresas de qualquer tamanho que querem automatizar e escalar seus atendimentos por WhatsApp. Imobiliárias, agências, consultórios e muito mais. Se você usa WhatsApp para atender clientes, o Encontra Leads é para você.',
  },
  {
    question: 'Como funciona a integração com o WhatsApp?',
    answer:
      'A integração é simples. Você conecta seu número de WhatsApp (pessoal ou comercial) à plataforma. A IA receberá e responderá às mensagens automaticamente, qualificando leads e encaminhando para a equipe certa.',
  },
  {
    question: 'Existe período de teste?',
    answer: `Sim! Todos os planos podem ser testados gratuitamente por ${TRIAL_DAYS} dias sem necessidade de cartão de crédito. Você tem acesso completo aos recursos do seu plano durante o período de teste.`,
  },
  {
    question: 'As conversas são seguras?',
    answer:
      'Sim! Usamos encriptação de ponta a ponta para todas as conversas. Seus dados estão seguros em servidores certificados em conformidade com LGPD. Nunca compartilhamos dados com terceiros.',
  },
];

const COMPARISON_COLUMNS = PLANS.map((plan) => ({
  key: plan.id,
  label: plan.name,
  highlight: plan.isHighlighted,
}));

const COMPARISON_ITEMS = [
  {
    label: 'Usuários',
    values: { essential: '1', professional: 'Até 5', business: 'Até 15', enterprise: 'Ilimitados' },
  },
  {
    label: 'Número de WhatsApp',
    values: { essential: '1', professional: '1', business: '1', enterprise: 'Múltiplos' },
  },
  {
    label: 'Qualificação de leads',
    values: { essential: 'Básica', professional: true, business: true, enterprise: true },
  },
  {
    label: 'Encaminhamento de leads',
    values: { essential: true, professional: true, business: true, enterprise: true },
  },
  {
    label: 'Distribuição automática de leads',
    values: { essential: false, professional: true, business: true, enterprise: true },
  },
  {
    label: 'Fila inteligente',
    values: { essential: false, professional: true, business: true, enterprise: true },
  },
  {
    label: 'Regras avançadas de distribuição',
    values: { essential: false, professional: false, business: true, enterprise: true },
  },
  {
    label: 'Personalização do agente',
    values: { essential: false, professional: true, business: true, enterprise: true },
  },
  {
    label: 'Relatórios',
    values: { essential: false, professional: 'Básicos', business: 'Avançados', enterprise: 'Avançados' },
  },
  {
    label: 'Integrações',
    values: { essential: false, professional: false, business: true, enterprise: true },
  },
  {
    label: 'Suporte',
    values: { essential: 'Padrão', professional: 'Padrão', business: 'Prioritário', enterprise: 'Dedicado' },
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const spotlightRef = useMouseSpotlight();

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

  const cycle = isAnnual ? 'annual' : 'monthly';

  const getAnnualSavingsText = (plan: (typeof PLANS)[number]) => {
    if (!isAnnual) return undefined;
    const saved = getPlanAnnualSavingsAmount(plan);
    if (saved == null) return undefined;
    return `Economize R$ ${saved.toLocaleString('pt-BR')} (2 meses grátis)`;
  };

  return (
    <div className="overflow-hidden bg-brand-bg">
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
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-bg/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Logo />
              </motion.div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" size="md" className="transition-all duration-200 hover:text-brand-mint">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/signup">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button variant="brand" size="md" className="relative overflow-hidden transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-2">
                      Testar Gratuitamente
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
      <section className="relative px-4 pt-32 pb-20 sm:px-6 lg:px-8 flex items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 20% 10%, rgba(6, 78, 59, 0.35) 0%, transparent 45%), radial-gradient(circle at 80% 20%, rgba(6, 36, 43, 0.6) 0%, transparent 50%)',
          }}
        />

        <motion.div
          className="mx-auto max-w-4xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            Escolha o plano ideal.
          </motion.div>

          {/* Título */}
          <motion.h1 variants={itemVariants} className="text-5xl font-bold tracking-tight sm:text-6xl mb-6 text-neutral-white">
            Escolha o plano ideal para o seu negócio.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p variants={itemVariants} className="text-xl text-neutral-gray sm:text-2xl mb-8">
            Comece pequeno, cresça quando precisar. Tenha atendimento inteligente, distribuição de leads e uma equipe mais eficiente em um só lugar.
          </motion.p>

          {/* Trust Message */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-sm text-neutral-gray mb-12"
          >
            <ShieldCheck className="h-4 w-4 text-brand-emerald" />
            Sem compromisso. Cancele quando quiser.
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div variants={itemVariants} className="mb-4">
            <PricingToggle onToggle={setIsAnnual} />
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Cards Section */}
      <section className="relative bg-brand-light px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-end">
            {PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                description={plan.description}
                price={getPlanPriceDisplay(plan, cycle)}
                period={cycle}
                badge={plan.badge}
                annualSavings={getAnnualSavingsText(plan)}
                features={plan.features}
                buttonText={plan.buttonText}
                isHighlighted={plan.isHighlighted}
                onCtaClick={
                  plan.id === 'enterprise'
                    ? () => {
                        // Placeholder for future "talk to a specialist" contact flow.
                        console.log('Enterprise contact');
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-brand-light">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-ink mb-4">
              Compare todos os recursos
            </h2>
            <p className="text-brand-slate">
              Veja em detalhes o que está incluído em cada plano
            </p>
          </div>

          {/* Table */}
          <ComparisonTable columns={COMPARISON_COLUMNS} items={COMPARISON_ITEMS} />
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-brand-light">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-brand-ink mb-4">
            Seu negócio cresce. O Encontra Leads acompanha.
          </h2>
          <p className="text-lg text-brand-slate mb-12">
            Comece com os recursos que você precisa hoje e evolua conforme sua operação cresce.
          </p>

          {/* Benefits Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: 'Comece em minutos',
                description: 'Conecte seu WhatsApp e comece a receber inteligência artificial em suas conversas em minutos.',
              },
              {
                icon: Shield,
                title: 'Sem contratos longos',
                description: 'Sem compromissos. Você controla sua assinatura e pode cancelar quando quiser.',
              },
              {
                icon: Headphones,
                title: 'Suporte quando precisar',
                description: 'Nossa equipe está aqui para ajudar. Suporte por e-mail, chat ou telefone, dependendo do seu plano.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand-emerald/10 mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <benefit.icon className="h-6 w-6 text-brand-emerald" />
                </motion.div>
                <h3 className="font-semibold text-brand-ink mb-2">{benefit.title}</h3>
                <p className="text-sm text-brand-slate">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-brand-light">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-ink mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-brand-slate">
              Tire suas dúvidas sobre preços, funcionalidades e como funciona o Encontra Leads
            </p>
          </div>

          {/* Accordion */}
          <FAQAccordion items={FAQItems} />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden bg-brand-bg">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(24, 199, 122, 0.12) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(6, 78, 59, 0.2) 0%, transparent 45%)',
          }}
        />

        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-neutral-white mb-4">
            Pronto para transformar seu atendimento?
          </h2>

          {/* Description */}
          <p className="text-lg text-neutral-gray mb-8">
            Comece hoje e descubra como o Encontra Leads pode ajudar sua equipe a atender melhor e aproveitar mais oportunidades.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/signup">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="brand" size="lg" className="flex items-center gap-2 w-full sm:w-auto">
                  Testar gratuitamente
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="lg"
                className="w-full border border-white/15 text-neutral-white hover:bg-white/5 sm:w-auto"
              >
                Agendar demonstração
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-brand-bg px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            {/* Brand */}
            <div>
              <Logo size="sm" className="mb-4" />
              <p className="text-sm text-neutral-gray">
                Transforme conversas em oportunidades.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-neutral-white mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li><Link href="/" className="hover:text-brand-mint transition-colors">Home</Link></li>
                <li><Link href="/pricing" className="hover:text-brand-mint transition-colors">Preços</Link></li>
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Recursos</Link></li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h4 className="font-semibold text-neutral-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Sobre</Link></li>
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Contato</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-neutral-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-neutral-gray">
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-brand-mint transition-colors">Termos</Link></li>
                <li><Link href="#" className="hover:text-brand-mint transition-colors">LGPD</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-gray">
              © 2026 Encontra Leads. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-neutral-gray hover:text-brand-mint transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-neutral-gray hover:text-brand-mint transition-colors">
                LinkedIn
              </Link>
              <Link href="#" className="text-neutral-gray hover:text-brand-mint transition-colors">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
