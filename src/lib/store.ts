'use client';

import { useCallback, useEffect, useState } from 'react';
import seed from '@/data/seed.json';
import type { DemoState, Grant, Medication, TimelineEvent } from './types';

const STORAGE_KEY = 'carepacket-demo-v1';

function cloneSeed(): DemoState {
  return JSON.parse(JSON.stringify(seed)) as DemoState;
}

export function loadState(): DemoState {
  if (typeof window === 'undefined') return cloneSeed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneSeed();
    return JSON.parse(raw) as DemoState;
  } catch {
    return cloneSeed();
  }
}

export function saveState(state: DemoState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState(): DemoState {
  const s = cloneSeed();
  saveState(s);
  return s;
}

export function useDemoStore() {
  const [state, setState] = useState<DemoState>(cloneSeed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  const update = useCallback((fn: (prev: DemoState) => DemoState) => {
    setState((prev) => {
      const next = fn(prev);
      saveState(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const s = resetState();
    setState(s);
  }, []);

  const revokeGrant = useCallback(
    (grantId: string) => {
      update((prev) => ({
        ...prev,
        grants: prev.grants.map((g) =>
          g.id === grantId ? { ...g, status: 'revoked' as const } : g
        ),
        timeline: [
          {
            id: `ev-${Date.now()}`,
            type: 'grant_revoked',
            title: 'Access revoked',
            body: `Revoked grant ${grantId}`,
            attribution: null,
            createdAt: new Date().toISOString(),
          },
          ...prev.timeline,
        ],
      }));
    },
    [update]
  );

  const createGrant = useCallback(
    (templateKey: string, recipient: string) => {
      const tpl = (
        [
          { key: 'specialist_intake', name: 'New Specialist Intake' },
          { key: 'school_ihp', name: 'School Nurse IHP' },
          { key: 'aba_intake', name: 'ABA Intake' },
        ] as const
      ).find((t) => t.key === templateKey);
      if (!tpl) return null;

      const token = `demo-pkt-${templateKey}-${Date.now().toString(36)}`;
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      const grant: Grant = {
        id: `grant-${Date.now()}`,
        templateKey,
        templateName: tpl.name,
        recipient,
        granteeOrgId: recipient.toLowerCase().includes('bayview') ? 'org-bayview' : null,
        status: 'active',
        expiresAt: expires.toISOString().slice(0, 10),
        createdAt: new Date().toISOString().slice(0, 10),
        token,
        viewCount: 0,
      };

      update((prev) => ({
        ...prev,
        grants: [grant, ...prev.grants],
        timeline: [
          {
            id: `ev-${Date.now()}`,
            type: 'grant_created',
            title: `Shared ${tpl.name}`,
            body: `Packet shared with ${recipient} · expires ${grant.expiresAt}`,
            attribution: null,
            createdAt: new Date().toISOString(),
          },
          ...prev.timeline,
        ],
      }));
      return grant;
    },
    [update]
  );

  const submitVisitNote = useCallback(
    (payload: {
      visitDate: string;
      summary: string;
      plan: string;
      medChange?: { action: string; name: string; dose: string; frequency: string };
    }) => {
      update((prev) => {
        let medications = [...prev.medications];
        if (payload.medChange && payload.medChange.name) {
          const mc = payload.medChange;
          if (mc.action === 'add' || mc.action === 'change') {
            const existing = medications.find(
              (m) => m.name.toLowerCase() === mc.name.toLowerCase()
            );
            if (existing) {
              medications = medications.map((m) =>
                m.id === existing.id
                  ? {
                      ...m,
                      dose: mc.dose || m.dose,
                      frequency: mc.frequency || m.frequency,
                      source: 'provider_portal',
                      status: 'active',
                    }
                  : m
              );
            } else {
              const med: Medication = {
                id: `med-${Date.now()}`,
                name: mc.name,
                dose: mc.dose || '',
                route: 'PO',
                frequency: mc.frequency || '',
                prescriber: prev.providerOrg.clinicianName,
                indication: 'Per visit note',
                status: 'active',
                source: 'provider_portal',
              };
              medications = [med, ...medications];
            }
          } else if (mc.action === 'stop') {
            medications = medications.map((m) =>
              m.name.toLowerCase() === mc.name.toLowerCase()
                ? { ...m, status: 'stopped', source: 'provider_portal' }
                : m
            );
          }
        }

        const event: TimelineEvent = {
          id: `ev-${Date.now()}`,
          type: 'note_back',
          title: `Visit note from ${prev.providerOrg.name}`,
          body: `${payload.summary}${payload.plan ? ` Plan: ${payload.plan}` : ''}`,
          attribution: {
            org: prev.providerOrg.name,
            clinician: prev.providerOrg.clinicianName,
            at: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
        };

        return {
          ...prev,
          medications,
          timeline: [event, ...prev.timeline],
        };
      });
    },
    [update]
  );

  return {
    state,
    hydrated,
    reset,
    revokeGrant,
    createGrant,
    submitVisitNote,
  };
}

export const DISCLAIMER =
  'Not a complete medical record. Parent-curated Care Packet — clinicians must reconcile with their chart. Not for diagnosis or treatment decisions.';
