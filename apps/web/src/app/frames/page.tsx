async function getFrameData() {
  try {
    const res = await fetch('http://localhost:3000/api/v1/frames/counts', { cache: 'no-store' });
    const json = await res.json();
    return json.ok ? json.data : [];
  } catch { return []; }
}

export default async function FramesPage() {
  const frames = await getFrameData();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-neutral-900">Frame Management</h1>
      <p className="mt-1 text-sm text-neutral-600">G4/G6 availability and shortage monitoring.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {frames.map((f: any) => {
          const c = f.latestCount;
          const total = c ? c.fullCount + c.looseCount + c.damagedCount + c.reservedCount + c.unavailableCount : 0;
          const shortfall = c?.demand ? c.demand - c.fullCount : null;
          return (
            <div key={f.id} className="rounded-lg border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{f.name} ({f.code})</h2>
                {shortfall !== null && shortfall > 0 && <span className="rounded bg-danger-bg px-2 py-0.5 text-xs font-medium text-danger-text">Shortfall: {shortfall}</span>}
              </div>
              <p className="mt-1 text-sm text-neutral-600">Capacity: {f.capacity}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-neutral-500">Full:</span> <span className="font-medium">{c?.fullCount ?? 0}</span></div>
                <div><span className="text-neutral-500">Loose:</span> <span className="font-medium">{c?.looseCount ?? 0}</span></div>
                <div><span className="text-neutral-500">Damaged:</span> <span className="font-medium">{c?.damagedCount ?? 0}</span></div>
                <div><span className="text-neutral-500">Total:</span> <span className="font-medium">{total}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
