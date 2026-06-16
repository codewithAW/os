interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6 space-y-2">
      <p className="text-xs uppercase tracking-[0.36em] text-cyan-300/70">{subtitle}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
