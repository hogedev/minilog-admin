import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateEntry } from "../hooks/useEntries";
import { PhotoUploader } from "../components/features/PhotoUploader";
import { toDateString } from "../lib/date-utils";

export default function NewEntryPage() {
  const [text, setText] = useState("");
  const [date, setDate] = useState(toDateString(new Date()));
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const createEntry = useCreateEntry();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() && files.length === 0) {
      toast.error("テキストか写真を入力してください");
      return;
    }

    const formData = new FormData();
    if (text.trim()) formData.append("text", text.trim());
    formData.append("entry_date", date);
    for (const file of files) {
      formData.append("photos", file);
    }

    try {
      await createEntry.mutateAsync(formData);
      toast.success("投稿しました");
      navigate("/");
    } catch {
      toast.error("投稿に失敗しました");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PhotoUploader files={files} onChange={setFiles} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="作業内容を記録..."
        rows={4}
        className="w-full bg-surface-1 border border-border rounded-lg px-3 py-2 text-sm text-[var(--c-text)] placeholder:text-[var(--c-text-faint)] focus:border-accent focus:outline-none resize-none"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full bg-surface-1 border border-border rounded-lg px-3 py-2 text-sm text-[var(--c-text)] focus:border-accent focus:outline-none"
      />

      <button
        type="submit"
        disabled={createEntry.isPending}
        className="w-full bg-accent text-white rounded-lg py-3 text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {createEntry.isPending ? "投稿中..." : "投稿する"}
      </button>
    </form>
  );
}
