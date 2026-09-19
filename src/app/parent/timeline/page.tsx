'use client';

import { AttributionStrip } from '@/components/AttributionStrip';
import { Disclaimer } from '@/components/Disclaimer';
import { useDemoStore } from '@/lib/store';
import Link from 'next/link';

export default function TimelinePage() {
  const { state, hydrated } = useDemoStore();

  if (!hydrated) {
    return <p className="text-ink-muted text-sm">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-muted">Vault timeline</p>
        <h1 className="text-[28px] leading-9 font-semibold">
          Updates for {state.child.preferredName}
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Provider note-backs appear here with clinic attribution.
        </p>
      </div>

      <Disclaimer />

      <div className="space-y-4">
        {state.timeline.map((ev) => (
          <article key={ev.id} className="cp-card space-y-3">
            <div className="flex flex-wrap justify-between gap-2">
              <h2 className="font-semibold">{ev.title}</h2>
              <time className="font-mono text-[11px] text-ink-muted">
                {new Date(ev.createdAt).toLocaleString()}
              </time>
            </div>
            <p className="text-sm">{ev.body}</p>
            {ev.attribution && (
              <AttributionStrip
                org={ev.attribution.org}
                clinician={ev.attribution.clinician}
                at={ev.attribution.at}
              />
            )}
          </article>
        ))}
      </div>

      <p className="text-sm text-ink-muted">
        Tip: submit a visit note from the{' '}
        <Link href="/provider/" className="text-brand-600 font-medium hover:underline">
          provider portal
        </Link>{' '}
        to see a new attributed event here.
      </p>
    </div>
  );
}
