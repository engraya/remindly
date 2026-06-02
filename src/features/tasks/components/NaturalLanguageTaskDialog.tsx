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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SlCalender } from "react-icons/sl";
import { LoaderCircle, Sparkles, ArrowLeft } from "lucide-react";
import {
  parseNaturalLanguageTaskAction,
  createTaskAction,
} from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Collection } from "@/features/collections/types";

type Step = "input" | "review";

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
  const [step, setStep] = useState<Step>("input");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedContent, setParsedContent] = useState("");
  const [reviewDate, setReviewDate] = useState<Date | undefined>(undefined);

  const resetAndClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStep("input");
      setInput("");
      setParsedContent("");
      setReviewDate(undefined);
    }
    onOpenChange(nextOpen);
  };

  const handleParse = async () => {
    if (input.trim().length < 8) {
      toast.error("Describe your task", {
        description: "Enter at least a short sentence about what to remember.",
      });
      return;
    }

    setLoading(true);
    try {
      const parsed = await parseNaturalLanguageTaskAction(input.trim());
      setParsedContent(parsed.content);
      setReviewDate(parsed.expiresAt ? new Date(parsed.expiresAt) : undefined);
      setStep("review");
    } catch (error) {
      toast.error("AI parsing failed", {
        description: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createTaskAction({
        collectionId: collection.id,
        content: parsedContent,
        expiresAt: reviewDate ?? null,
      });
      resetAndClose(false);
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
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden />
            {step === "input" ? "Add task with AI" : "Review & confirm"}
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-xs">
            {step === "input" ? (
              <>
                Describe your task for{" "}
                <span className="font-medium text-foreground">
                  {collection.name}
                </span>
                , including any deadline.
              </>
            ) : (
              "Check what the AI parsed. Adjust the date if needed."
            )}
          </DialogDescription>
        </DialogHeader>

        {step === "input" ? (
          <>
            {/* Step 1 — Body */}
            <div className="px-5 py-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleParse();
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
                  ⌘ Enter to parse
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

            {/* Step 1 — Footer */}
            <div className="flex gap-2 border-t border-border bg-muted/20 px-5 py-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => resetAndClose(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleParse}
                disabled={loading || input.trim().length < 8}
                className="flex-1"
              >
                {loading ? (
                  <>
                    Parsing
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Parse with AI
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2 — Body */}
            <div className="flex flex-col gap-4 px-5 py-4">
              {/* Parsed content */}
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Task
                </p>
                <p className="rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-sm text-foreground">
                  {parsedContent}
                </p>
              </div>

              {/* Date picker */}
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Due date
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !reviewDate && "text-muted-foreground"
                      )}
                      disabled={loading}
                    >
                      <SlCalender className="mr-2 h-4 w-4" />
                      {reviewDate ? format(reviewDate, "dd/MM/yyyy") : "No expiration"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={reviewDate}
                      onSelect={setReviewDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Step 2 — Footer */}
            <div className="flex gap-2 border-t border-border bg-muted/20 px-5 py-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("input")}
                disabled={loading}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={handleCreate}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    Creating
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
