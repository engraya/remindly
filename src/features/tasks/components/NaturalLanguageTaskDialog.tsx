"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Sparkles } from "lucide-react";
import { createTaskFromNaturalLanguageAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";
import type { Collection } from "@/features/collections/types";

type NaturalLanguageTaskDialogProps = {
  collection: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NaturalLanguageTaskDialog({
  collection,
  open,
  onOpenChange,
}: NaturalLanguageTaskDialogProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const openChangeWrapper = (nextOpen: boolean) => {
    if (!nextOpen) setInput("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    if (input.trim().length < 8) {
      toast.error("Describe your task", {
        description: "Enter at least a short sentence about what to remember.",
      });
      return;
    }

    setLoading(true);
    try {
      await createTaskFromNaturalLanguageAction(collection.id, input.trim());
      openChangeWrapper(false);
      toast.success("Task created with AI", {
        description: "Your task was parsed and saved.",
      });
    } catch (error) {
      toast.error("AI task creation failed", {
        description: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const charsLeft = 500 - input.length;

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            Add task with AI
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-xs">
            Describe your task for{" "}
            <span className="font-medium text-foreground">
              {collection.name}
            </span>
            , including any deadline.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="px-5 py-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
            }}
            placeholder="e.g. Remind me to call the dentist tomorrow at 3pm"
            rows={4}
            maxLength={500}
            disabled={loading}
            autoFocus
            className="resize-none"
            aria-label="Natural language task description"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              ⌘ Enter to submit
            </span>
            <span
              className={cn(
                "text-xs tabular-nums",
                charsLeft < 50 ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {charsLeft} left
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 border-t border-border bg-muted/20 px-5 py-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => openChangeWrapper(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading || input.trim().length < 8}
            className="flex-1"
          >
            {loading ? (
              <>
                Creating
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Create
                <Sparkles className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
