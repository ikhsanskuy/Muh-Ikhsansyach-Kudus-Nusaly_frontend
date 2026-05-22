"use client";

import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function SelectDropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={`flex h-[54px] w-full cursor-pointer items-center justify-between rounded-[4px] border px-[14px] ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          borderColor: "#ebebeb",
          background: disabled ? "#f4f4f4" : "#fff",
        }}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        <span
          className="text-[16px] font-normal"
          style={{ color: selected ? "#232323" : "#868686" }}
        >
          {selected ? selected.label : placeholder}
        </span>
        {!disabled && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4l-4-4 8 0-4 4z"
              fill="#000"
              transform="translate(5.333, 6.667)"
            />
          </svg>
        )}
      </div>

      {open && !disabled && (
        <div
          className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-[4px] border bg-white shadow-lg"
          style={{ borderColor: "#ebebeb" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer px-[14px] py-3 text-[16px] font-normal transition-colors hover:bg-gray-50"
              style={{
                color: option.value === value ? "#4a8394" : "#232323",
                fontWeight: option.value === value ? 600 : 400,
                background: option.value === value ? "#f0f7fa" : "transparent",
              }}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
