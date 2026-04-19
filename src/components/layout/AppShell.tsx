import { Outlet } from "react-router-dom";
import { toggleTheme } from "../../lib/theme";
import { BottomNav } from "./BottomNav";

export function AppShell() {
  return (
    <div className="min-h-screen bg-surface-0 pb-16">
      <header className="sticky top-0 z-40 bg-surface-1 border-b border-border">
        <div className="max-w-md mx-auto flex items-center justify-between px-3 py-2">
          <h1 className="text-lg font-bold text-[var(--c-text-strong)]">
            農作業日誌
          </h1>
          <button
            onClick={toggleTheme}
            className="rounded border border-border px-2 py-1 text-xs hover:border-border-hover"
          >
            🌓
          </button>
        </div>
      </header>
      <main className="max-w-md mx-auto px-3 py-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
