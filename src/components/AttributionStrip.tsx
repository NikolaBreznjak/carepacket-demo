export function AttributionStrip({
  org,
  clinician,
  at,
}: {
  org: string;
  clinician: string;
  at: string;
}) {
  const when = (() => {
    try {
      return new Date(at).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return at;
    }
  })();

  return (
    <div className="cp-attribution">
      <span>
        Added by {org} · {clinician} · <span className="font-mono text-[11px]">{when}</span>
      </span>
    </div>
  );
}
