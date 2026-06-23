export default function QuantityStepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="h-10 w-10 rounded-full text-lg text-sand-50 transition hover:bg-white/10"
      >
        -
      </button>
      <span className="min-w-10 px-3 text-center text-sm font-medium text-sand-50">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="h-10 w-10 rounded-full text-lg text-sand-50 transition hover:bg-white/10"
      >
        +
      </button>
    </div>
  );
}

