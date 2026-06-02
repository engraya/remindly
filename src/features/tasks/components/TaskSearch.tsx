"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TaskSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function TaskSearch({ query, onQueryChange }: TaskSearchProps) {
  const [localValue, setLocalValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => onQueryChange(localValue), 200);
    return () => clearTimeout(timer);
  }, [localValue, onQueryChange]);

  const handleClear = useCallback(() => {
    setLocalValue("");
    onQueryChange("");
  }, [onQueryChange]);

  return (
    <div className="relative flex-1">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50"
        aria-hidden
      />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search collections or tasks…"
        className="h-9 border-0 bg-transparent pl-8 pr-8 text-sm shadow-none focus-visible:border-0 focus-visible:ring-0"
        aria-label="Search tasks"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded text-muted-foreground/60 hover:text-foreground"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
