'use client';

import { Disclaimer } from '@/components/Disclaimer';
import { EmergencyCardView } from '@/components/EmergencyCard';
import { SectionCard } from '@/components/SectionCard';
import { useDemoStore } from '@/lib/store';
import Link from 'next/link';

export default function ParentNotebookPage() {
  const { state, hydrated, reset } = useDemoStore();

  if (!hydrated) {
    return <p className="text-ink-muted text-sm">Loading Care Notebook…</p>;
  }

  const { child, diagnoses, medications, allergies, therapies, devices, education, emergencyCard, preferredCommunication, careTeam } = state;
  const filled = [
    diagnoses.length > 0,
    medications.length > 0,
    allergies.length > 0,
    therapies.length > 0,
    !!education,
    !!emergencyCard,
    !!preferredCommunication,
    careTeam.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-ink-muted">Care Notebook</p>
          <h1 className="text-[28px] leading-9 font-semibold">
            {child.preferredName} Rivera · {child.ageBand}
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Autism / developmental delay · Parent: {child.parentName}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1">
            {filled} of 8 sections ready
          </span>
          <Link href="/parent/share/" className="cp-btn-primary !py-2 !text-sm">
            Share packet
          </Link>
        </div>
      </div>

      <Disclaimer />

      <SectionCard title="Diagnoses" meta="Updated by parent">
        <ul className="space-y-3">
          {diagnoses.map((d) => (
            <li key={d.id} className="border-b border-line last:border-0 pb-3 last:pb-0">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-medium">{d.name}</span>
                {d.icd10 && (
                  <span className="font-mono text-xs text-ink-muted">{d.icd10}</span>
                )}
              </div>
              <p className="text-sm text-ink-muted mt-0.5">
                {d.status} · onset {d.onset}
              </p>
              {d.notes && <p className="text-sm mt-1">{d.notes}</p>}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Medications" meta="Includes provider write-backs">
        <ul className="space-y-3">
          {medications.map((m) => (
            <li key={m.id} className="border-b border-line last:border-0 pb-3 last:pb-0">
              <div className="flex flex-wrap justify-between gap-2">
                <span className="font-medium">{m.name}</span>
                <span className="font-mono text-xs">
                  {m.dose} {m.route} {m.frequency}
                </span>
              </div>
              <p className="text-sm text-ink-muted mt-0.5">
                {m.prescriber} · {m.indication} · source: {m.source}
                {m.status !== 'active' ? ` · ${m.status}` : ''}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Allergies / adverse reactions">
        <ul className="space-y-2">
          {allergies.map((a) => (
            <li key={a.id} className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
              <span className="font-medium text-danger">{a.allergen}</span>
              <span>{a.reaction}</span>
              <span className="text-ink-muted capitalize">{a.severity}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Therapies">
        <ul className="space-y-3">
          {therapies.map((t) => (
            <li key={t.id}>
              <p className="font-medium">
                {t.type} · {t.providerName}
              </p>
              <p className="text-sm text-ink-muted">{t.frequency}</p>
              <p className="text-sm mt-0.5">{t.goalsSummary}</p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="Devices / equipment" empty={devices.length === 0} />

      <SectionCard title="IEP / 504" meta={education?.lastReviewDate ? `Review ${education.lastReviewDate}` : undefined}>
        {education && (
          <div className="text-sm space-y-2">
            <p>
              <span className="font-medium">{education.planType}</span> · {education.classification} ·{' '}
              {education.school}
            </p>
            <p className="text-ink-muted">{education.accommodations}</p>
          </div>
        )}
      </SectionCard>

      <EmergencyCardView child={child} card={emergencyCard} />

      <SectionCard title="Preferred communication">
        <dl className="text-sm space-y-3">
          <div>
            <dt className="text-xs font-medium text-ink-muted">Sensory</dt>
            <dd>{preferredCommunication.sensoryNotes}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">How to talk</dt>
            <dd>{preferredCommunication.howToTalk}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Triggers</dt>
            <dd>{preferredCommunication.triggers}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-ink-muted">Strategies that work</dt>
            <dd>{preferredCommunication.strategies}</dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard title="Care team">
        <ul className="space-y-3">
          {careTeam.map((c) => (
            <li key={c.id} className="text-sm">
              <p className="font-medium">{c.name}</p>
              <p className="text-ink-muted">
                {c.role} · {c.org}
              </p>
              <p className="font-mono text-xs mt-0.5">
                {c.phone} · {c.email}
              </p>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="pt-4 border-t border-warm-200 flex flex-wrap gap-3 items-center justify-between">
        <button type="button" onClick={reset} className="cp-btn-secondary !text-sm !py-2">
          Reset demo data
        </button>
        <Link href="/parent/timeline/" className="text-sm text-brand-600 font-medium hover:underline">
          View timeline with provider notes →
        </Link>
      </div>
    </div>
  );
}
