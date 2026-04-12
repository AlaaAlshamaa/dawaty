export default function SectionCard({
    id,
    title,
    subtitle,
    theme,
    children,
  }: {
    id: string;
    title: string;
    subtitle?: string;
    theme: {
      cardBg: string;
      border: string;
      text: string;
      mutedText: string;
    };
    children: React.ReactNode;
  }) {
    return (
      <section id={id} className={`scroll-mt-24 rounded-3xl border p-5 ${theme.cardBg} ${theme.border} ${theme.text}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-black">{title}</h2>
            {subtitle ? <p className={`mt-1 text-sm ${theme.mutedText}`}>{subtitle}</p> : null}
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    );
  }
  