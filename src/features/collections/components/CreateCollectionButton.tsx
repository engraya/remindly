"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/Loader";

const CreateCollectionSheet = dynamic(
  () =>
    import("@/features/collections/components/CreateCollectionSheet").then(
      (m) => m.CreateCollectionSheet
    ),
  {
    loading: () => <Loader className="py-2" />,
    ssr: false,
  }
);

export function CreateCollectionButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-1.5 shrink-0">
        <Plus className="h-4 w-4" aria-hidden />
        New Collection
      </Button>
      {open && (
        <CreateCollectionSheet open={open} onOpenChange={setOpen} />
      )}
    </>
  );
}
