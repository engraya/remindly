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

  // Debounce: propagate to parent 200ms after the user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onQueryChange(localValue);
    }, 200);
    return () => clearTimeout(timer);
  }, [localValue, onQueryChange]);

  const handleClear = useCallback(() => {
    setLocalValue("");
    onQueryChange("");
  }, [onQueryChange]);

  return (
    <div className="relative flex-1">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search tasks or collections…"
        className="pl-9 pr-9"
        aria-label="Search tasks"
      />
      {localValue && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
