"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SlCalender } from "react-icons/sl";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTaskSchema,
  type UpdateTaskInput,
} from "@/features/tasks/schemas/update-task.schema";
import { updateTaskAction } from "@/features/tasks/actions";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import type { Task } from "@/features/collections/types";

type EditTaskDialogProps = {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const form = useForm<UpdateTaskInput>({
    defaultValues: {
      taskId: task.id,
      content: task.content,
      expiresAt: task.expireAt ? new Date(task.expireAt) : undefined,
    },
    resolver: zodResolver(updateTaskSchema),
  });

  const openChangeWrapper = (value: boolean) => {
    onOpenChange(value);
    if (!value) {
      form.reset({
        taskId: task.id,
        content: task.content,
        expiresAt: task.expireAt ? new Date(task.expireAt) : undefined,
      });
    }
  };

  const onSubmit = async (data: UpdateTaskInput) => {
    try {
      await updateTaskAction(data);
      openChangeWrapper(false);
      toast.success("Task updated", {
        description: "Your task has been updated successfully.",
      });
    } catch (error) {
      toast.error("Error updating task", {
        description: getErrorMessage(error),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>Update the task content or due date.</DialogDescription>
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
                    <Textarea placeholder="Task description" rows={4} {...field} />
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
                          selected={field.value ?? undefined}
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
                className="w-full"
              >
                Save changes
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
