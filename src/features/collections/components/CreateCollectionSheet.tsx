"use client";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Separator } from "@/components/ui/separator";
import { LoaderCircle } from "lucide-react";
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

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent side="top" className="mx-auto max-w-lg rounded-b-xl">
        <SheetHeader>
          <SheetTitle>Create a New Collection</SheetTitle>
          <SheetDescription>
            Organize your tasks into a themed collection.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Work, Personal, Health" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div
                      className="grid grid-cols-6 gap-2"
                      role="radiogroup"
                      aria-label="Collection color"
                    >
                      {(Object.keys(CollectionColors) as CollectionColor[]).map(
                        (color) => (
                          <button
                            key={color}
                            type="button"
                            role="radio"
                            aria-checked={field.value === color}
                            aria-label={color}
                            onClick={() => field.onChange(color)}
                            title={color}
                            className={cn(
                              "h-8 w-full rounded-lg transition-all duration-150",
                              CollectionColors[color],
                              field.value === color
                                ? "scale-110 ring-2 ring-primary ring-offset-2"
                                : "hover:scale-105 hover:ring-1 hover:ring-white/40"
                            )}
                          />
                        )
                      )}
                    </div>
                  </FormControl>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Selected:{" "}
                    <span className="font-medium text-foreground">
                      {field.value}
                    </span>
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              Create Collection
              {form.formState.isSubmitting && (
                <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
