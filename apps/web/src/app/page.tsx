import { Logo } from '@/components/Logo';
import { ShiftShopperCalculator } from '@/components/ShiftShopperCalculator';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
      <Logo width={160} height={42} className="mx-auto" />
      <h1 className="mt-3 text-center text-lg font-semibold text-neutral-800">Shift picking calculator</h1>
      <p className="mt-1 text-center text-sm text-neutral-500">Calculate shoppers and rounds needed to complete picking</p>

      <ShiftShopperCalculator />
    </div>
  );
}
