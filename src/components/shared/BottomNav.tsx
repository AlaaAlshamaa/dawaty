"use client";

type Item = { id: string; label: string };

export default function BottomNav({
  items,
  theme,
}: {
  items: Item[];
  theme: { cardBg: string; border: string; text: string; mutedText: string; primary: string };
}) {
  function go(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
      <div className={`mx-auto max-w-md rounded-2xl border p-2 backdrop-blur ${theme.cardBg} ${theme.border}`}>
        <div className="grid grid-cols-4 gap-2">
          {items.slice(0, 4).map((it) => (
            <button
              key={it.id}
              onClick={() => go(it.id)}
              className={`rounded-xl px-3 py-2 text-xs font-black ${theme.text} hover:opacity-90`}
            >
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
