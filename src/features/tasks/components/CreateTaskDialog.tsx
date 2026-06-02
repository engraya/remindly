"use client";

import { Button } from "@/components/ui/button";
import type { Collection } from "@/features/collections/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { useForm } from "react-hook-form";
import {
  createTaskSchema,
  type CreateTaskInput,
} from "@/features/tasks/schemas/create-task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { createTaskAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";

type CreateTaskDialogProps = {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
};

export function CreateTaskDialog({
  open,
  setOpen,
  collection,
}: CreateTaskDialogProps) {
  const form = useForm<CreateTaskInput>({
    defaultValues: {
      collectionId: collection.id,
      content: "",
    },
    resolver: zodResolver(createTaskSchema),
  });

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    if (!value) form.reset({ collectionId: collection.id, content: "" });
  };

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      await createTaskAction(data);
      openChangeWrapper(false);
      toast.success("Task created", {
        description: "Your task has been created successfully.",
      });
    } catch (error) {
      toast.error("Error creating task", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            New task in{" "}
            <span
              className={cn(
                "bg-clip-text text-transparent",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              {collection.name}
            </span>
          </DialogTitle>
          <DialogDescription>Add a task to your collection</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Do some groceries"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires at</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <SlCalender className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "No expiration"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={cn(
                  "w-full",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                Confirm
                {form.formState.isSubmitting && (
                  <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
