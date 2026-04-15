import { useRef, useState, useCallback } from "react";
import { useImageWorker } from "@/hooks/useImageWorker";

interface ImageUploaderProps {
  onLog?: (msg: string) => void;
}

export function ImageUploader({ onLog }: ImageUploaderProps) {
  const { result, decodeImage, extractPalette } = useImageWorker();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setFileName(file.name);
    onLog?.(`Processing: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    file.arrayBuffer().then((buf) => {
      decodeImage(buf.slice(0));
      file.arrayBuffer().then((buf2) => {
        extractPalette(buf2, 8);
      });
    });
  }, [decodeImage, extractPalette, onLog]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  }, [processFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="image-uploader">
      <div
        className={`drop-zone ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <span>{fileName ?? "Drop image here or click to browse"}</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
      {result?.cmd === "EXTRACT_PALETTE" && (
        <div className="palette-row">
          {result.palette.map((c, i) => (
            <div
              key={i}
              className="palette-swatch"
              style={{ backgroundColor: `rgb(${c[0]},${c[1]},${c[2]})` }}
              title={`rgb(${c[0]},${c[1]},${c[2]})`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
