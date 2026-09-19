'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ConsentPill } from '@/components/ConsentPill';
import { Disclaimer } from '@/components/Disclaimer';
import { useDemoStore } from '@/lib/store';
import { PACKET_TEMPLATES } from '@/lib/types';

export default function SharePacketsPage() {
  const { state, hydrated, revokeGrant, createGrant } = useDemoStore();
  const [templateKey, setTemplateKey] = useState<string>('specialist_intake');
  const [recipient, setRecipient] = useState('Bayview DBP Clinic');
  const [lastToken, setLastToken] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const template = useMemo(
    () => PACKET_TEMPLATES.find((t) => t.key === templateKey)!,
    [templateKey]
  );

  if (!hydrated) {
    return <p className="text-ink-muted text-sm">Loading…</p>;
  }

  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const lastLink = lastToken
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}${base}/share/?t=${lastToken}`
    : null;

  const handleCreate = () => {
    const grant = createGrant(templateKey, recipient.trim() || 'Recipient');
    if (grant) {
      setLastToken(grant.token);
      setPreviewOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-muted">Share packets</p>
        <h1 className="text-[28px] leading-9 font-semibold">Send a Care Packet</h1>
        <p className="text-sm text-ink-muted mt-1">
          Regenerate from {state.child.preferredName}&apos;s notebook — no re-entry required.
        </p>
      </div>

      <Disclaimer />

      <section className="cp-card space-y-4">
        <h2 className="font-semibold text-lg">New share</h2>
        <div className="space-y-2">
          <p className="text-xs font-medium text-ink-muted">Template</p>
          <div className="grid gap-2">
            {PACKET_TEMPLATES.map((t) => (
              <label
                key={t.key}
                className={`flex gap-3 p-3 rounded-parent border cursor-pointer transition-colors ${
                  templateKey === t.key
                    ? 'border-brand-600 bg-brand-100/50'
                    : 'border-line hover:bg-warm-50'
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  className="mt-1"
                  checked={templateKey === t.key}
                  onChange={() => setTemplateKey(t.key)}
                />
                <span>
                  <span className="font-medium block">{t.name}</span>
                  <span className="text-sm text-ink-muted">{t.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-ink-muted" htmlFor="recipient">
            Recipient
          </label>
          <input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 w-full rounded-parent border border-line px-3 py-2.5 text-sm bg-surface"
            placeholder="Clinic or school nurse"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="cp-btn-primary" onClick={handleCreate}>
            Generate packet + share link
          </button>
          <button
            type="button"
            className="cp-btn-secondary"
            onClick={() => setPreviewOpen((v) => !v)}
          >
            {previewOpen ? 'Hide preview' : 'Preview sections'}
          </button>
        </div>

        {previewOpen && (
          <div className="rounded-parent border border-line bg-warm-50 p-4 text-sm space-y-2">
            <p className="font-medium">{template.name} includes</p>
            <ul className="list-disc pl-5 text-ink-muted">
              {template.sections.map((s) => (
                <li key={s} className="capitalize">
                  {s === 'communication'
                    ? 'Preferred communication'
                    : s === 'careTeam'
                      ? 'Care team'
                      : s === 'emergency'
                        ? 'Emergency card'
                        : s === 'education'
                          ? 'IEP / 504'
                          : s === 'devices'
                            ? 'Devices (empty in this demo)'
                            : s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-muted pt-2 border-t border-warm-200">
              Expiry default: 30 days · Parent can revoke anytime
            </p>
          </div>
        )}

        {lastLink && lastToken && (
          <div className="rounded-parent border border-brand-600/30 bg-brand-100/40 p-4 space-y-2">
            <p className="text-sm font-medium text-brand-700">Mock share link ready</p>
            <p className="font-mono text-xs break-all bg-surface border border-line rounded-lg px-3 py-2">
              {lastLink}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="cp-btn-secondary !py-2 !text-sm"
                onClick={() => navigator.clipboard?.writeText(lastLink)}
              >
                Copy link
              </button>
              <Link href={`/share/?t=${lastToken}`} className="cp-btn-primary !py-2 !text-sm">
                Open shared packet
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-lg">Active & past grants</h2>
        {state.grants.length === 0 && (
          <div className="cp-card-empty">No packets shared yet</div>
        )}
        {state.grants.map((g) => (
          <div key={g.id} className="cp-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-medium">{g.templateName}</p>
              <p className="text-sm text-ink-muted">
                {g.recipient} · created {g.createdAt} · views {g.viewCount}
              </p>
              <p className="font-mono text-[11px] text-ink-muted mt-1">token: {g.token}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ConsentPill
                status={g.status}
                expiresAt={g.expiresAt}
                onRevoke={() => revokeGrant(g.id)}
              />
              {g.status === 'active' && (
                <Link
                  href={`/share/?t=${g.token}`}
                  className="text-sm font-medium text-brand-600 hover:underline"
                >
                  Preview
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
