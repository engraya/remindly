"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCollectionSchema,
  type CreateCollectionInput,
} from "@/features/collections/schemas/create-collection.schema";
import { createCollectionAction } from "@/features/collections/actions";
import { CollectionColors, CollectionColor } from "@/lib/constants";
import { LoaderCircle, Check } from "lucide-react";
import { getErrorMessage } from "@/lib/errors";

type CreateCollectionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateCollectionSheet({
  open,
  onOpenChange,
}: CreateCollectionSheetProps) {
  const form = useForm<CreateCollectionInput>({
    defaultValues: { name: "", color: "Sunset" },
    resolver: zodResolver(createCollectionSchema),
  });

  const watchedName = form.watch("name");
  const watchedColor = form.watch("color") as CollectionColor;

  const openChangeWrapper = (nextOpen: boolean) => {
    if (!nextOpen) form.reset();
    onOpenChange(nextOpen);
  };

  const onSubmit = async (data: CreateCollectionInput) => {
    try {
      await createCollectionAction(data);
      openChangeWrapper(false);
      toast.success("Collection created", {
        description: "Your collection has been created successfully.",
      });
    } catch (error) {
      toast.error("Error creating collection", {
        description: getErrorMessage(error),
      });
    }
  };

  const initial = watchedName.trim().charAt(0).toUpperCase();
  const colorKeys = Object.keys(CollectionColors) as CollectionColor[];

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="max-w-sm gap-0 overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="text-base font-semibold">
            New Collection
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-xs">
            Name it, pick a color, and start organizing.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="px-5 py-5">
          {/* Live preview pill */}
          <div className="mb-4 flex items-center gap-2.5">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                CollectionColors[watchedColor]
              )}
            >
              <span className="text-xs font-bold text-white">
                {initial || "#"}
              </span>
            </div>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {watchedName.trim() || (
                <span className="text-muted-foreground">Collection name</span>
              )}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">Preview</span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Work, Personal, Health"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color */}
              <FormField
                name="color"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-2 flex items-center justify-between">
                      <FormLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Color
                      </FormLabel>
                      <span className="text-xs font-medium text-foreground">
                        {field.value}
                      </span>
                    </div>
                    <FormControl>
                      <div
                        className="grid grid-cols-10 gap-1.5"
                        role="radiogroup"
                        aria-label="Collection color"
                      >
                        {colorKeys.map((color) => (
                          <button
                            key={color}
                            type="button"
                            role="radio"
                            aria-checked={field.value === color}
                            aria-label={color}
                            title={color}
                            onClick={() => field.onChange(color)}
                            className={cn(
                              "relative aspect-square w-full rounded-full transition-all duration-150",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                              CollectionColors[color],
                              field.value === color
                                ? "scale-110 ring-2 ring-ring ring-offset-2"
                                : "opacity-55 hover:opacity-85 hover:scale-105"
                            )}
                          >
                            {field.value === color && (
                              <Check
                                className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow"
                                aria-hidden
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openChangeWrapper(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex-1"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      Creating
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
