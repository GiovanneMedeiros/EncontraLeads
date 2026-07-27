'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ComparisonColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

export interface ComparisonItem {
  label: string;
  values: Record<string, string | boolean>;
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[];
  items: ComparisonItem[];
}

const renderValue = (value: string | boolean | null | undefined) => {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle className="h-5 w-5 text-brand-emerald mx-auto" />
    ) : (
      <span className="text-brand-border">—</span>
    );
  }
  return <span className="text-sm text-brand-slate">{value}</span>;
};

export const ComparisonTable = React.forwardRef<HTMLDivElement, ComparisonTableProps>(
  ({ columns, items }, ref) => (
    <div ref={ref} className="w-full overflow-x-auto rounded-2xl border border-brand-border bg-white">
      <motion.div
        className="min-w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Desktop Table */}
        <table className="hidden md:table w-full">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-semibold text-brand-ink">Recursos</span>
              </th>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 text-center">
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      column.highlight ? 'text-brand-forest' : 'text-brand-ink'
                    )}
                  >
                    {column.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {items.map((item, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="hover:bg-brand-light transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-sm text-brand-ink font-medium">{item.label}</span>
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-center">
                    {renderValue(item.values[column.key])}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="border border-brand-border rounded-lg p-4 space-y-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="font-medium text-brand-ink">{item.label}</div>
              <div
                className="grid gap-2 text-xs"
                style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
              >
                {columns.map((column) => (
                  <div key={column.key} className="text-center">
                    <div
                      className={cn(
                        'mb-1',
                        column.highlight ? 'font-medium text-brand-forest' : 'text-brand-slate'
                      )}
                    >
                      {column.label}
                    </div>
                    <div>{renderValue(item.values[column.key])}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
);

ComparisonTable.displayName = 'ComparisonTable';
