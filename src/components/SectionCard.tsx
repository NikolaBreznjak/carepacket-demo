import { ReactNode } from 'react';

export function SectionCard({
  title,
  meta,
  children,
  empty,
  emptyLabel = 'Not added yet',
}: {
  title: string;
  meta?: string;
  children?: ReactNode;
  empty?: boolean;
  emptyLabel?: string;
}) {
  if (empty) {
    return (
      <section className="cp-card-empty">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          {meta && <span className="text-xs text-ink-muted">{meta}</span>}
        </div>
        <p className="text-sm mt-2">{emptyLabel}</p>
      </section>
    );
  }

  return (
    <section className="cp-card">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        {meta && <span className="text-xs text-ink-muted">{meta}</span>}
      </div>
      {children}
    </section>
  );
}
