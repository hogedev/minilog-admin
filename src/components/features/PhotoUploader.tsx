import { useRef } from "react";

interface Props {
  files: File[];
  onChange: (files: File[]) => void;
}

export function PhotoUploader({ files, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      onChange([...files, ...Array.from(e.target.files)]);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border-2 border-dashed border-border rounded-lg py-6 text-center text-[var(--c-text-muted)] hover:border-accent transition-colors"
      >
        <span className="text-2xl block mb-1">📷</span>
        <span className="text-sm">写真を追加</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      {files.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {files.map((file, i) => (
            <div key={i} className="relative shrink-0">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--c-danger)] text-white rounded-full text-xs flex items-center justify-center"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
