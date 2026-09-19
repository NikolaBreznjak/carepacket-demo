'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DemoBanner } from '@/components/DemoBanner';
import { Disclaimer } from '@/components/Disclaimer';
import { EmergencyCardView } from '@/components/EmergencyCard';
import { useDemoStore } from '@/lib/store';

export default function ProviderPortalPage() {
  const { state, hydrated, submitVisitNote } = useDemoStore();
  const [selectedId, setSelectedId] = useState('child-alex');
  const [visitDate, setVisitDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState('');
  const [plan, setPlan] = useState('');
  const [medAction, setMedAction] = useState('change');
  const [medName, setMedName] = useState('Guanfacine ER');
  const [medDose, setMedDose] = useState('1.5 mg');
  const [medFreq, setMedFreq] = useState('QHS');
  const [submitted, setSubmitted] = useState(false);

  if (!hydrated) {
    return (
      <div className="provider-shell min-h-screen">
        <DemoBanner />
        <p className="p-6 text-ink-muted text-sm">Loading portal…</p>
      </div>
    );
  }

  const activeGrants = state.grants.filter(
    (g) => g.status === 'active' && (g.granteeOrgId === state.providerOrg.id || g.recipient.includes('Bayview'))
  );
  const roster = state.roster.filter((r) =>
    activeGrants.some((g) => g.id === r.grantId) || r.childId === 'child-alex'
  ).filter((r) => {
    const g = state.grants.find((x) => x.id === r.grantId);
    return !g || g.status === 'active';
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;
    submitVisitNote({
      visitDate,
      summary: summary.trim(),
      plan: plan.trim(),
      medChange: medName.trim()
        ? { action: medAction, name: medName.trim(), dose: medDose, frequency: medFreq }
        : undefined,
    });
    setSubmitted(true);
    setSummary('');
    setPlan('');
  };

  return (
    <div className="provider-shell min-h-screen">
      <DemoBanner />
      <header className="border-b border-line bg-surface sticky top-0 z-20">
        <div className="mx-auto max-w-provider px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold text-brand-700">
              CarePacket
            </Link>
            <span className="text-line">|</span>
            <div>
              <p className="text-sm font-semibold">{state.providerOrg.name}</p>
              <p className="text-xs text-ink-muted">
                {state.providerOrg.clinicianName} · {state.providerOrg.role} · BAA{' '}
                {state.providerOrg.baaStatus}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="cp-btn-secondary !py-1.5 !px-3 !text-sm !rounded-provider !min-h-0"
              onClick={() => window.print()}
            >
              Download PDF
            </button>
            <Link href="/parent/" className="text-sm text-ink-muted hover:text-brand-600">
              ← Parent demo
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-provider px-4 py-4">
        <Disclaimer className="mb-4" />

        <div className="grid lg:grid-cols-[280px_1fr_300px] gap-4 items-start">
          {/* Roster */}
          <aside className="cp-card !p-0 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-line bg-canvas">
              <h2 className="text-sm font-semibold">Roster</h2>
              <p className="text-xs text-ink-muted">Active parent grants only</p>
            </div>
            <ul>
              {roster.length === 0 && (
                <li className="px-3 py-4 text-xs text-ink-muted">No patients with active grants</li>
              )}
              {roster.map((r) => (
                <li key={r.childId}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(r.childId);
                      setSubmitted(false);
                    }}
                    className={`w-full text-left px-3 py-3 border-b border-line last:border-0 transition-colors ${
                      selectedId === r.childId ? 'bg-brand-100' : 'hover:bg-canvas'
                    }`}
                  >
                    <p className="font-medium text-sm">{r.displayName}</p>
                    <p className="text-xs text-ink-muted">
                      {r.ageBand} · {r.packetLabel}
                    </p>
                    <p className="font-mono text-[10px] text-ink-muted mt-0.5">
                      updated {r.lastUpdated}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Packet */}
          <section className="space-y-3">
            <div className="cp-card">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <div>
                  <h1 className="text-lg font-semibold">
                    {state.child.legalName} · Packet
                  </h1>
                  <p className="text-xs text-ink-muted">
                    Parent-curated · New Specialist Intake · grant active
                  </p>
                </div>
                <span className="text-xs font-medium text-ok bg-[#E8F5EE] px-2 py-1 rounded">
                  Ready for visit
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Diagnoses
                  </h3>
                  <ul className="space-y-1">
                    {state.diagnoses.map((d) => (
                      <li key={d.id} className="flex justify-between gap-2">
                        <span>{d.name}</span>
                        {d.icd10 && <span className="font-mono text-xs text-ink-muted">{d.icd10}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Medications
                  </h3>
                  <ul className="space-y-1">
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
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Allergies
                  </h3>
                  <ul className="space-y-1">
                    {state.allergies.map((a) => (
                      <li key={a.id} className="text-danger font-medium">
                        {a.allergen} — {a.reaction} ({a.severity})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Therapies
                  </h3>
                  <ul className="space-y-1">
                    {state.therapies.map((t) => (
                      <li key={t.id}>
                        {t.type} · {t.providerName} · {t.frequency}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Communication prefs
                  </h3>
                  <p>{state.preferredCommunication.howToTalk}</p>
                </div>
              </div>
            </div>
            <EmergencyCardView child={state.child} card={state.emergencyCard} />
          </section>

          {/* Actions */}
          <aside className="cp-card space-y-3 sticky top-20">
            <h2 className="text-sm font-semibold">Note back</h2>
            <p className="text-xs text-ink-muted">
              Updates parent vault only; does not update your EHR. Copy to chart as needed.
            </p>
            {submitted ? (
              <div className="rounded-provider bg-[#E8F5EE] border border-ok/30 p-3 text-sm space-y-2">
                <p className="font-medium text-ok">Visit note sent to parent vault</p>
                <Link href="/parent/timeline/" className="text-brand-600 font-medium hover:underline text-xs">
                  View on parent timeline →
                </Link>
                <button
                  type="button"
                  className="cp-btn-secondary !py-1.5 !text-xs !rounded-provider !min-h-0 w-full"
                  onClick={() => setSubmitted(false)}
                >
                  Add another note
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-2.5">
                <div>
                  <label className="text-xs text-ink-muted" htmlFor="vdate">
                    Visit date
                  </label>
                  <input
                    id="vdate"
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="mt-0.5 w-full border border-line rounded-provider px-2 py-1.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted" htmlFor="summary">
                    Visit summary
                  </label>
                  <textarea
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={3}
                    className="mt-0.5 w-full border border-line rounded-provider px-2 py-1.5 text-sm"
                    placeholder="Chief concerns + assessment (short)"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted" htmlFor="plan">
                    Plan / follow-up
                  </label>
                  <textarea
                    id="plan"
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    rows={2}
                    className="mt-0.5 w-full border border-line rounded-provider px-2 py-1.5 text-sm"
                    placeholder="Optional"
                  />
                </div>
                <div className="border-t border-line pt-2 space-y-1.5">
                  <p className="text-xs font-medium text-ink-muted">Med change (optional)</p>
                  <select
                    value={medAction}
                    onChange={(e) => setMedAction(e.target.value)}
                    className="w-full border border-line rounded-provider px-2 py-1.5 text-sm"
                  >
                    <option value="add">Add</option>
                    <option value="change">Change dose</option>
                    <option value="stop">Stop</option>
                  </select>
                  <input
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    placeholder="Medication name"
                    className="w-full border border-line rounded-provider px-2 py-1.5 text-sm font-mono"
                  />
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      value={medDose}
                      onChange={(e) => setMedDose(e.target.value)}
                      placeholder="Dose"
                      className="border border-line rounded-provider px-2 py-1.5 text-sm font-mono"
                    />
                    <input
                      value={medFreq}
                      onChange={(e) => setMedFreq(e.target.value)}
                      placeholder="Freq"
                      className="border border-line rounded-provider px-2 py-1.5 text-sm font-mono"
                    />
                  </div>
                </div>
                <button type="submit" className="cp-btn-primary !rounded-provider !text-sm w-full">
                  Submit visit note
                </button>
              </form>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
