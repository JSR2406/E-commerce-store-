export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-xs uppercase tracking-[0.4em] text-sand-300/70">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-sand-50 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-6 text-sand-200/80">{description}</p> : null}
    </div>
  );
}

