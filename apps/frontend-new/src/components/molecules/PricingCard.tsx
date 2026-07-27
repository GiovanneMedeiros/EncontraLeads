'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface PricingCardProps {
  name: string;
  description: string;
  price: number | string;
  period: 'monthly' | 'annual';
  badge?: string;
  features: string[];
  buttonText: string;
  isHighlighted?: boolean;
  annualSavings?: string;
  onCtaClick?: () => void;
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      name,
      description,
      price,
      period,
      badge,
      features,
      buttonText,
      isHighlighted = false,
      annualSavings,
      onCtaClick,
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      className={cn('relative h-full', isHighlighted && 'lg:-translate-y-3')}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {badge && (
        <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2">
          <motion.span
            className="inline-flex items-center whitespace-nowrap rounded-full bg-brand-emerald px-4 py-1 text-xs font-semibold text-white shadow-md shadow-brand-emerald/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {badge}
          </motion.span>
        </div>
      )}

      <div
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-8 transition-all duration-300',
          isHighlighted
            ? 'border-2 border-brand-emerald shadow-xl shadow-brand-emerald/10'
            : 'border-brand-border shadow-sm hover:-translate-y-1 hover:shadow-lg'
        )}
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-brand-ink">{name}</h3>
          <p className="mt-2 text-sm text-brand-slate">{description}</p>
        </div>

        {/* Pricing */}
        <div className="mb-6 space-y-2">
          <motion.div
            className="flex items-baseline gap-2"
            key={`${price}-${period}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {typeof price === 'number' ? (
              <>
                <span className="text-5xl font-bold text-brand-ink">
                  R$ {price.toLocaleString('pt-BR')}
                </span>
                <span className="text-brand-slate">/{period === 'monthly' ? 'mês' : 'ano'}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-brand-ink">{price}</span>
            )}
          </motion.div>

          {/* Savings Badge */}
          {annualSavings && period === 'annual' && (
            <motion.p
              className="text-sm font-medium text-brand-forest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {annualSavings}
            </motion.p>
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          className="mb-8 w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={isHighlighted ? 'brand' : 'brandOutline'}
            size="lg"
            fullWidth
            onClick={onCtaClick}
            className="transition-all duration-300"
          >
            {buttonText}
          </Button>
        </motion.div>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-brand-emerald mt-0.5" />
              <span className="text-sm text-brand-slate">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
);

PricingCard.displayName = 'PricingCard';
