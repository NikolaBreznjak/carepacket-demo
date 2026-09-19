import { DemoBanner } from '@/components/DemoBanner';
import { ParentNav } from '@/components/ParentNav';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm-50">
      <DemoBanner />
      <ParentNav />
      <div className="mx-auto max-w-notebook px-4 py-8">{children}</div>
    </div>
  );
}
