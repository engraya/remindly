"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Sparkles } from "lucide-react";
import { createTaskFromNaturalLanguageAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
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
      setInput("");
      onOpenChange(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden />
            Add task with AI
          </DialogTitle>
          <DialogDescription>
            Describe your task naturally, e.g. &quot;Remind me to submit taxes on
            April 15&quot;
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Remind me to call the dentist tomorrow at 3pm"
          rows={4}
          maxLength={500}
          aria-label="Natural language task description"
        />
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full"
          >
            Create task
            {loading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
