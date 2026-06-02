"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortKey } from "@/features/collections/hooks/use-collection-sort";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "most-complete", label: "Most complete" },
  { value: "least-complete", label: "Least complete" },
];

type CollectionSortSelectProps = {
  value: SortKey;
  onValueChange: (value: SortKey) => void;
};

export function CollectionSortSelect({
  value,
  onValueChange,
}: CollectionSortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className="w-auto shrink-0 gap-2 border-0 bg-transparent shadow-none focus:ring-0 data-[state=open]:ring-0"
        aria-label="Sort collections"
      >
        <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
