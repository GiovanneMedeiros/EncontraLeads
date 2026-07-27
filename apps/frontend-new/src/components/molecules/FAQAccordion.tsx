'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion = React.forwardRef<HTMLDivElement, FAQAccordionProps>(
  ({ items }, ref) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
      <div ref={ref} className="space-y-3 w-full max-w-3xl mx-auto">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div
              className={cn(
                'rounded-xl border bg-white p-4 cursor-pointer transition-all duration-300',
                'border-brand-border hover:border-brand-emerald/40',
                expandedIndex === index && 'border-brand-emerald/50 bg-brand-light'
              )}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-brand-ink text-sm md:text-base">
                    {item.question}
                  </h3>
                </div>

                {/* Chevron Icon */}
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-0.5"
                >
                  <ChevronDown className="h-5 w-5 text-brand-emerald" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-sm text-brand-slate leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);

FAQAccordion.displayName = 'FAQAccordion';
