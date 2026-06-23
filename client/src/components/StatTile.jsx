export default function StatTile({ label, value, hint }) {
  return (
    <div className="soft-panel rounded-[1.5rem] p-5">
      <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-2xl font-semibold text-sand-50">{value}</p>
        {hint ? <p className="text-sm text-sand-200/70">{hint}</p> : null}
      </div>
    </div>
  );
}

