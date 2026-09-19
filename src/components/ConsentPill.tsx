'use client';

export function ConsentPill({
  status,
  expiresAt,
  onRevoke,
}: {
  status: string;
  expiresAt?: string;
  onRevoke?: () => void;
}) {
  const revoked = status === 'revoked' || status === 'expired';
  return (
    <span className={`cp-consent-pill ${revoked ? 'revoked' : ''}`}>
      <span>
        {revoked ? status.charAt(0).toUpperCase() + status.slice(1) : 'Active'}
        {expiresAt && status === 'active' ? ` · Expires ${expiresAt}` : ''}
      </span>
      {status === 'active' && onRevoke && (
        <button type="button" className="cp-btn-danger-text !p-0 !text-xs" onClick={onRevoke}>
          Revoke
        </button>
      )}
    </span>
  );
}
