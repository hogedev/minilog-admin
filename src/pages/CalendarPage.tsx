import { useState } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { useEntryDates } from "../hooks/useEntries";

const DOW = ["月", "火", "水", "木", "金", "土", "日"];

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const { data: dates } = useEntryDates(year, month);

  const dateSet = new Set(dates || []);

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0).getDate();
  const startDow = (firstDay.getDay() + 6) % 7;

  const cells: (number | null)[] = [
    ...Array.from<null>({ length: startDow }).fill(null),
    ...Array.from({ length: lastDay }, (_, i) => i + 1),
  ];

  function prevMonth() {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 text-sm border border-border rounded hover:border-border-hover"
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold text-[var(--c-text-strong)]">
          {year}年{month}月
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1 text-sm border border-border rounded hover:border-border-hover"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {DOW.map((d) => (
          <div
            key={d}
            className={clsx(
              "py-1 font-medium text-[var(--c-text-muted)]",
              d === "土" && "text-blue-400",
              d === "日" && "text-red-400",
            )}
          >
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`pad-${i}`} />;

          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const hasEntry = dateSet.has(dateStr);
          const isToday = isCurrentMonth && today.getDate() === day;
          const dow = new Date(year, month - 1, day).getDay();

          const cell = (
            <div
              className={clsx(
                "relative py-2 rounded transition-colors",
                isToday && "ring-2 ring-accent",
                hasEntry
                  ? "bg-surface-1 hover:bg-surface-2 cursor-pointer"
                  : "text-[var(--c-text-faint)]",
              )}
            >
              <span
                className={clsx(
                  "text-sm",
                  dow === 6 && "text-blue-400",
                  dow === 0 && "text-red-400",
                )}
              >
                {day}
              </span>
              {hasEntry && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </div>
          );

          if (hasEntry) {
            return (
              <Link
                key={dateStr}
                to={`/?date=${dateStr}`}
                className="no-underline"
              >
                {cell}
              </Link>
            );
          }
          return <div key={dateStr}>{cell}</div>;
        })}
      </div>
    </div>
  );
}
