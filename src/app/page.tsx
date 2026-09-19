import Link from 'next/link';
import { CheckCircle2, FileStack, NotebookPen, Share2, Stethoscope } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-warm-50 text-ink">
      <header className="border-b border-warm-200/80 bg-warm-50/90 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-dash px-4 py-4 flex items-center justify-between gap-4">
          <span className="font-semibold text-xl text-brand-700 tracking-tight">CarePacket</span>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/parent/" className="cp-btn-secondary !py-2 !px-3 text-sm">
              Parent demo
            </Link>
            <Link href="/provider/" className="cp-btn-primary !py-2 !px-3 text-sm">
              Provider demo
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-dash px-4 pt-14 pb-16 sm:pt-20">
          <p className="text-sm font-medium text-brand-600 mb-3">
            Free for parents · Providers pay for intake
          </p>
          <h1 className="text-[40px] leading-[48px] font-semibold max-w-3xl text-balance">
            You already know this — we just keep it ready.
          </h1>
          <p className="mt-5 text-lg text-ink-muted max-w-2xl">
            CarePacket is a parent-controlled Care Notebook for kids with autism and developmental
            delay (ages 2–12), plus a thin provider portal that pulls current intake packets and
            writes visit notes back — so families stop retyping the same binder for every specialist,
            ABA clinic, and school nurse.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/parent/" className="cp-btn-primary">
              Try parent Care Notebook
            </Link>
            <Link href="/provider/" className="cp-btn-secondary">
              Open provider portal
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Interactive product demo with fictional data only. No real PHI. No HIPAA claims.
          </p>
        </section>

        <section className="bg-surface border-y border-line">
          <div className="mx-auto max-w-dash px-4 py-14 grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 rounded-parent bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
                <NotebookPen size={20} strokeWidth={1.5} />
              </div>
              <h2 className="font-semibold text-lg mb-2">The problem</h2>
              <p className="text-ink-muted text-[15px]">
                Parents of children with special health care needs are the interoperability layer.
                Same diagnoses, meds, allergies, IEP, and emergency info — re-entered for every new
                specialist and school form.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-parent bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
                <Share2 size={20} strokeWidth={1.5} />
              </div>
              <h2 className="font-semibold text-lg mb-2">The solution</h2>
              <p className="text-ink-muted text-[15px]">
                Enter once in a Care Notebook. Generate New Specialist, School Nurse IHP, or ABA
                Intake packets with time-bound, revocable consent. Providers pull the packet and
                note back with attribution.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-parent bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
                <Stethoscope size={20} strokeWidth={1.5} />
              </div>
              <h2 className="font-semibold text-lg mb-2">Who it&apos;s for</h2>
              <p className="text-ink-muted text-[15px]">
                Beachhead: autism / developmental delay, ages 2–12. Buyers: developmental-behavioral
                pediatrics and complex-care clinics. Parents stay free forever for the core vault.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-dash px-4 py-14">
          <h2 className="text-2xl font-semibold mb-6">Parents free. Providers pay.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="cp-card bg-warm-50 border-warm-200">
              <h3 className="font-semibold text-lg mb-2">Families</h3>
              <ul className="space-y-2 text-[15px]">
                {[
                  'Care Notebook: diagnoses, meds, allergies, therapies, IEP/504, emergency card',
                  'Share packets in one click — you control who sees what',
                  'Consent pills with expiry + instant revoke',
                  'Visit notes land back in your timeline with clinic attribution',
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <CheckCircle2 className="text-ok shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/parent/" className="cp-btn-primary mt-6 inline-flex">
                Open parent demo
              </Link>
            </div>
            <div className="cp-card">
              <h3 className="font-semibold text-lg mb-2">Clinics</h3>
              <ul className="space-y-2 text-[15px]">
                {[
                  'Roster of patients with active parent grants only',
                  'Structured packet view — not another EHR',
                  'Download-ready intake before the visit',
                  '≤3-minute visit note-back → parent vault',
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <FileStack className="text-brand-600 shrink-0 mt-0.5" size={18} strokeWidth={1.5} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link href="/provider/" className="cp-btn-primary mt-6 inline-flex">
                Open provider demo
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-brand-700 text-white">
          <div className="mx-auto max-w-dash px-4 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Walk the full loop in under two minutes</h2>
              <p className="mt-2 text-white/80 text-[15px] max-w-xl">
                Parent notebook → share packet → provider roster → note-back → parent timeline.
                Fictional child: Alex Rivera, age ~7, autism / developmental delay.
              </p>
            </div>
            <Link
              href="/parent/"
              className="inline-flex items-center justify-center bg-white text-brand-700 font-semibold px-5 py-3 rounded-[10px] min-h-[44px] hover:bg-brand-100 transition-colors"
            >
              Start parent demo
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-dash px-4 py-8 text-sm text-ink-muted space-y-2">
          <p className="font-medium text-ink">CarePacket</p>
          <p>
            Demo only. Not a complete medical record. Not for diagnosis or treatment decisions. No
            real patient data.
          </p>
          <p>© 2026 CarePacket · Product demo</p>
        </div>
      </footer>
    </div>
  );
}
