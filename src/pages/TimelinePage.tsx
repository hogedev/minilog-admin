import { useEntries } from "../hooks/useEntries";
import { EntryCard } from "../components/features/EntryCard";
import type { Entry } from "../types";

function groupByDate(entries: Entry[]): Map<string, Entry[]> {
  const groups = new Map<string, Entry[]>();
  for (const entry of entries) {
    const date = entry.entry_date;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date)!.push(entry);
  }
  return groups;
}

function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}月${d.getDate()}日（${dow}）`;
}

export default function TimelinePage() {
  const { data, isLoading, error } = useEntries({ limit: 50 });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-[var(--c-text-muted)]">
        読み込み中...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-[var(--c-danger)]">
        読み込みエラー
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--c-text-muted)]">
        <p className="text-lg mb-2">まだ投稿がありません</p>
        <p className="text-sm">下の📷ボタンから投稿してみましょう</p>
      </div>
    );
  }

  const groups = groupByDate(data.items);

  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([date, entries]) => (
        <section key={date}>
          <h2 className="text-sm font-bold text-[var(--c-text-strong)] mb-2 sticky top-12 bg-surface-0 py-1 z-10">
            {formatDateHeader(date)}
          </h2>
          <div className="space-y-3">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
