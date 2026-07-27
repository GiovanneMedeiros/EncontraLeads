'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Route,
  Settings,
  CheckCircle2,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/cn';

function useCountUp(target: number, durationMs = 1200, startDelayMs = 300) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now() + startDelayMs;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, startDelayMs]);

  return value;
}

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, active: false },
  { icon: MessageSquare, active: true },
  { icon: Users, active: false },
  { icon: Route, active: false },
  { icon: Settings, active: false },
];

const CHART_BARS = [38, 52, 46, 64, 58, 78, 70];

const CONVERSATIONS = [
  { name: 'Marina Alves', initials: 'MA', accent: 'from-brand-emerald to-brand-forest' },
  { name: 'Carlos Souza', initials: 'CS', accent: 'from-brand-green to-brand-petrol' },
];

function MiniStat({
  label,
  value,
  suffix,
  trend,
}: {
  label: string;
  value: number;
  suffix?: string;
  trend: string;
}) {
  const animated = useCountUp(value);

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <p className="text-[11px] text-neutral-gray">{label}</p>
      <p className="mt-1 text-lg font-semibold text-neutral-white">
        {animated}
        {suffix}
      </p>
      <p className="mt-0.5 text-[11px] font-medium text-emerald-400">{trend}</p>
    </div>
  );
}

export function ProductMockup() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2600);
    const t2 = setTimeout(() => setStage(2), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-emerald/20 via-brand-forest/10 to-transparent blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bg-secondary to-bg-primary shadow-2xl shadow-black/40"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <span className="text-xs font-medium text-neutral-gray">app.encontraleads.com</span>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-14 flex-col items-center gap-3 border-r border-white/5 py-5 sm:flex">
            {SIDEBAR_ITEMS.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                  item.active
                    ? 'bg-brand-emerald/20 text-brand-mint'
                    : 'text-neutral-gray/50'
                )}
              >
                <item.icon className="h-4 w-4" />
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-white">Bom dia, equipe</p>
                <p className="text-[11px] text-neutral-gray">Resumo do atendimento hoje</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-emerald to-brand-forest" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <MiniStat label="Conversas" value={24} trend="+18%" />
              <MiniStat label="Qualificados" value={12} trend="+9%" />
              <MiniStat label="Oportunidades" value={7} trend="+4" />
              <MiniStat label="Resp. média" value={1} suffix="min" trend="-12%" />
            </div>

            {/* Mini chart */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="mb-3 text-[11px] font-medium text-neutral-gray">
                Atendimentos · 7 dias
              </p>
              <div className="flex h-16 items-end gap-1.5 sm:gap-2">
                {CHART_BARS.map((height, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-emerald/70 to-brand-mint/40"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </div>

            {/* Conversations */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] divide-y divide-white/5">
              {CONVERSATIONS.map((conversation, index) => (
                <div key={conversation.name} className="flex items-center gap-3 p-3">
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white',
                      conversation.accent
                    )}
                  >
                    {conversation.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-neutral-white">
                      {conversation.name}
                    </p>
                    <p className="truncate text-[11px] text-neutral-gray">
                      {index === 0 && stage === 0 && 'digitando...'}
                      {index === 0 && stage >= 1 && 'Procuro um apartamento de 2 quartos'}
                      {index === 1 && 'Podemos agendar a visita amanhã?'}
                    </p>
                  </div>
                  {index === 0 && stage >= 2 ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="shrink-0 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300"
                    >
                      Qualificado
                    </motion.span>
                  ) : (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-brand-emerald" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating notification: new qualified lead */}
      {stage >= 2 && (
        <motion.div
          className="absolute -right-4 top-8 hidden max-w-[13rem] rounded-2xl border border-white/10 bg-bg-secondary/95 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:block"
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-white">Lead qualificado</p>
              <p className="mt-0.5 text-[11px] text-neutral-gray">Marina Alves está pronta para atendimento</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating notification: distribution */}
      <motion.div
        className="absolute -left-6 bottom-10 hidden max-w-[11rem] rounded-2xl border border-white/10 bg-bg-secondary/95 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:block"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, 8, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.4 },
          scale: { duration: 0.5, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/15 text-brand-mint">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-white">Encaminhado</p>
            <p className="mt-0.5 text-[11px] text-neutral-gray">Próximo da vez: Carlos</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
