'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DemoBanner } from '@/components/DemoBanner';
import { Disclaimer } from '@/components/Disclaimer';
import { EmergencyCardView } from '@/components/EmergencyCard';
import { ConsentPill } from '@/components/ConsentPill';
import { useDemoStore } from '@/lib/store';
import { PACKET_TEMPLATES } from '@/lib/types';

function SharedPacketInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') || '';
  const { state, hydrated } = useDemoStore();

  if (!hydrated) {
    return <p className="p-6 text-sm text-ink-muted">Loading packet…</p>;
  }

  const grant = state.grants.find((g) => g.token === token);
  const template = PACKET_TEMPLATES.find((t) => t.key === grant?.templateKey);

  if (!token || !grant) {
    return (
      <div className="mx-auto max-w-notebook px-4 py-16 text-center space-y-3">
        <h1 className="text-2xl font-semibold">Packet not found</h1>
        <p className="text-ink-muted text-sm">
          Missing or unknown share token. Create a packet from the parent Share packets screen.
        </p>
        <Link href="/parent/share/" className="cp-btn-primary inline-flex">
          Go to Share packets
        </Link>
      </div>
    );
  }

  if (grant.status !== 'active') {
    return (
      <div className="mx-auto max-w-notebook px-4 py-16 text-center space-y-3">
        <h1 className="text-2xl font-semibold">Access revoked or expired</h1>
        <p className="text-ink-muted text-sm">Parent controls access — this link is no longer valid.</p>
        <ConsentPill status={grant.status} expiresAt={grant.expiresAt} />
        <div>
          <Link href="/parent/share/" className="cp-btn-secondary inline-flex mt-4">
            Back to parent demo
          </Link>
        </div>
      </div>
    );
  }

  const sections: string[] = template ? [...template.sections] : [];

  return (
    <main className="mx-auto max-w-notebook px-4 py-8 space-y-5">
      <div className="flex flex-wrap justify-between gap-3 items-start">
        <div>
          <h1 className="text-[28px] font-semibold leading-9">
            {state.child.preferredName} · {state.child.ageBand}
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            {grant.templateName} · shared with {grant.recipient}
          </p>
        </div>
        <ConsentPill status={grant.status} expiresAt={grant.expiresAt} />
      </div>

      <Disclaimer />

      {sections.includes('diagnoses') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Diagnoses</h2>
          <ul className="text-sm space-y-1">
            {state.diagnoses.map((d) => (
              <li key={d.id}>
                {d.name}{' '}
                {d.icd10 && <span className="font-mono text-xs text-ink-muted">{d.icd10}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.includes('medications') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Medications</h2>
          <ul className="text-sm space-y-1">
            {state.medications
              .filter((m) => m.status === 'active')
              .map((m) => (
                <li key={m.id} className="flex justify-between gap-2">
                  <span>{m.name}</span>
                  <span className="font-mono text-xs">
                    {m.dose} {m.frequency}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      )}

      {sections.includes('allergies') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Allergies</h2>
          <ul className="text-sm space-y-1">
            {state.allergies.map((a) => (
              <li key={a.id} className="text-danger font-medium">
                {a.allergen} — {a.reaction}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.includes('therapies') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Therapies</h2>
          <ul className="text-sm space-y-2">
            {state.therapies.map((t) => (
              <li key={t.id}>
                <span className="font-medium">{t.type}</span> · {t.providerName} · {t.frequency}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.includes('education') && state.education && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">IEP / 504</h2>
          <p className="text-sm">
            {state.education.planType} · {state.education.classification}
          </p>
          <p className="text-sm text-ink-muted mt-1">{state.education.accommodations}</p>
        </section>
      )}

      {sections.includes('devices') && (
        <section className="cp-card-empty">
          <h2 className="font-semibold text-ink mb-1">Devices / equipment</h2>
          <p className="text-sm">Not added yet</p>
        </section>
      )}

      {sections.includes('careTeam') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Care team</h2>
          <ul className="text-sm space-y-2">
            {state.careTeam.map((c) => (
              <li key={c.id}>
                {c.name} · {c.role} · {c.org}
              </li>
            ))}
          </ul>
        </section>
      )}

      {sections.includes('communication') && (
        <section className="cp-card">
          <h2 className="font-semibold mb-2">Preferred communication</h2>
          <p className="text-sm">{state.preferredCommunication.howToTalk}</p>
          <p className="text-sm text-ink-muted mt-2">{state.preferredCommunication.strategies}</p>
        </section>
      )}

      {sections.includes('emergency') && (
        <EmergencyCardView child={state.child} card={state.emergencyCard} />
      )}

      <p className="text-xs text-ink-muted text-center pt-4 border-t border-warm-200">
        Not a complete medical record. Clinicians must reconcile with their chart. Demo token{' '}
        <span className="font-mono">{grant.token}</span>
      </p>

      <div className="flex flex-wrap gap-3 justify-center pb-8">
        <Link href="/provider/" className="cp-btn-primary">
          Open in provider portal
        </Link>
        <Link href="/parent/share/" className="cp-btn-secondary">
          Manage grants
        </Link>
      </div>
    </main>
  );
}

export default function SharedPacketPage() {
  return (
    <div className="min-h-screen bg-warm-50">
      <DemoBanner />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-notebook px-4 py-4">
          <p className="font-semibold text-brand-700">CarePacket</p>
          <p className="text-sm text-ink-muted">Parent-curated Care Packet</p>
        </div>
      </header>
      <Suspense fallback={<p className="p-6 text-sm text-ink-muted">Loading…</p>}>
        <SharedPacketInner />
      </Suspense>
    </div>
  );
}
