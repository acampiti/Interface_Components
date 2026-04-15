import { useState, useRef, useCallback } from "react";
import "./FileDropZone.css";

interface FileDropZoneProps {
  onFiles?: (files: File[]) => void;
  accept?: string;
  label?: string;
}

export function FileDropZone({
  onFiles,
  accept,
  label = "Drop files here or click to browse",
}: FileDropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const arr = Array.from(files);
      setFileNames(arr.map((f) => f.name));
      onFiles?.(arr);
    },
    [onFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="file-dropzone-wrapper">
      <div
        className={`file-dropzone${dragOver ? " file-dropzone--drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-dropzone-input"
          accept={accept}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />

        <svg
          className="file-dropzone-icon"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 22V10M16 10L11 15M16 10L21 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 20V24C6 25.1046 6.89543 26 8 26H24C25.1046 26 26 25.1046 26 24V20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="file-dropzone-label">{label}</span>
        {accept && (
          <span className="file-dropzone-accept">
            Accepted: {accept}
          </span>
        )}
      </div>

      {fileNames.length > 0 && (
        <ul className="file-dropzone-list">
          {fileNames.map((name, i) => (
            <li key={i} className="file-dropzone-list-item">{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
