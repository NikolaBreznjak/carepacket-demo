# CarePacket Demo

Interactive product demo for **CarePacket** — a parent Care Notebook for special-needs kids plus a provider-paid portal for intake packets.

> Product name is **CarePacket** (never HealthVault).

## Live demo

After GitHub Pages is enabled: **https://nikolabreznjak.github.io/carepacket-demo/**

## What's in the demo

1. **Marketing landing** — problem, solution, ICP, parents free / providers pay
2. **Parent Care Notebook** — fictional child Alex Rivera (~7, autism/dev delay): diagnoses, meds, allergies, therapies, empty devices, IEP/504, emergency card, communication prefs, care team
3. **Share packets** — New Specialist Intake, School Nurse IHP, ABA Intake → preview, mock share link, consent pills with revoke
4. **Provider portal** — roster | packet | note-back actions (Bayview DBP)
5. **Vault timeline** — provider write-backs with attribution strip
6. Seed JSON + `localStorage` persistence (reset from parent notebook)

## Stack

Next.js 14 App Router · TypeScript · Tailwind · static export for GitHub Pages

## Local

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build:pages
# output in out/
```

## Disclaimer

Demo only. Fictional data. Not a complete medical record. Not for diagnosis or treatment decisions. No real HIPAA/auth/payments.
