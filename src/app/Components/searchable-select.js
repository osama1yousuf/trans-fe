"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function SearchableSelect({
  options = [],
  placeholder = "Select an option...",
  emptyMessage = "No option found.",
  handleSelect,
  driverIds,
}) {
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("bottom");

  // Ensure options is an array
  if (!Array.isArray(options)) {
    console.error("Options must be an array");
    return null;
  }

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? "select-dropdown" : undefined}
      >
        <span className="truncate text-black">
          {driverIds?.length > 0 ? `${driverIds.length} selected` : placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>

      {open && (
        <div
          className={`absolute ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-0 z-50 w-full rounded-md border border-input bg-popover text-popover-foreground shadow-md`}
          id="select-dropdown"
          role="listbox"
        >
          <div className="flex items-center border-b border-border px-3 py-2">
            <input
              ref={inputRef}
              className="flex h-8 w-full rounded-md bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={`Search ${placeholder.toLowerCase()}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
                    driverIds?.includes(option.value)
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                  role="option"
                  aria-selected={driverIds?.includes(option.value)}
                  onClick={() => {
                    handleSelect(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      driverIds.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
