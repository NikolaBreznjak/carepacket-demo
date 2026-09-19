import type { DemoState } from '@/lib/types';

export function EmergencyCardView({
  child,
  card,
}: {
  child: DemoState['child'];
  card: DemoState['emergencyCard'];
}) {
  return (
    <div className="cp-emergency">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-medium text-danger uppercase tracking-wide">Emergency card</p>
          <h3 className="text-xl font-semibold mt-0.5">
            {child.preferredName} · {child.ageBand}
          </h3>
        </div>
        <span className="text-xs text-ink-muted">Printable one-pager</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs font-medium text-ink-muted mb-1">Diagnoses</p>
          <ul className="list-disc pl-4 space-y-0.5">
            {card.oneLiners.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-muted mb-1">Allergies</p>
          <ul className="list-disc pl-4 space-y-0.5 text-danger font-medium">
            {card.criticalAllergies.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-muted mb-1">Medications</p>
          <ul className="list-disc pl-4 space-y-0.5 font-mono text-[13px]">
            {card.criticalMeds.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-ink-muted mb-1">Contacts</p>
          <ul className="space-y-1">
            {card.contacts.map((c) => (
              <li key={c.phone}>
                {c.name} · <span className="font-mono text-[13px]">{c.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-sm">
        <span className="text-ink-muted">Hospital preference:</span> {card.hospitalPreference}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{card.notes}</p>
    </div>
  );
}
