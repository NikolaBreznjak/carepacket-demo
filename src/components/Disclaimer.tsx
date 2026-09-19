import { DISCLAIMER } from '@/lib/store';

export function Disclaimer({ className = '' }: { className?: string }) {
  return <p className={`cp-disclaimer ${className}`}>{DISCLAIMER}</p>;
}
