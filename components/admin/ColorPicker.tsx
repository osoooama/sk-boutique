"use client";

import { useRef } from "react";

const PRESETS = [
  { label: "أسود", hex: "#1a1a1a" },
  { label: "أبيض", hex: "#f5f5f5" },
  { label: "وردي", hex: "#FFB6C1" },
  { label: "ذهبي", hex: "#C9A84C" },
  { label: "كحلي", hex: "#1B2A4A" },
  { label: "بيج", hex: "#D4B896" },
  { label: "رمادي", hex: "#808080" },
  { label: "بني", hex: "#8B4513" },
  { label: "زيتي", hex: "#556B2F" },
];

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => inputRef.current?.click()}
          className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0"
          style={{
            background: value || "#1a1a1a",
            borderColor: value?.toLowerCase() === "#f5f5f5" || value?.toLowerCase() === "#ffffff"
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.1)",
          }}
        />
        <input
          ref={inputRef}
          type="color"
          value={value || "#1a1a1a"}
          onChange={(e) => onChange(e.target.value)}
          className="w-0 h-0 opacity-0 absolute pointer-events-none"
        />
        <input
          type="text"
          dir="ltr"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#HEX"
          className="flex-1 h-10 rounded-xl px-3 text-xs font-mono border transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#F5F5F0",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#C9A84C";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(201,168,76,0.2)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.hex}
            type="button"
            title={p.label}
            onClick={() => onChange(p.hex)}
            className="w-7 h-7 rounded-full transition-transform hover:scale-125 flex-shrink-0"
            style={{
              background: p.hex,
              border: value === p.hex
                ? "2px solid #C9A84C"
                : "2px solid rgba(255,255,255,0.08)",
              boxShadow: value === p.hex ? "0 0 8px rgba(201,168,76,0.4)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
