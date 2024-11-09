import React from 'react'
import { Button } from './ui/button'
import { Collection } from './CollectionCard'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from './ui/dialog';
import { cn } from '@/lib/utils';
import { CollectionColor, CollectionColors } from '@/lib/constants';
import { useForm } from 'react-hook-form';
import { createTaskSchema, CreateTaskShemaType } from '@/db/createTask';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { SlCalender } from "react-icons/sl";
import { format } from 'date-fns';
import {LoaderCircle} from 'lucide-react';
import { createTask } from '@/db/actions';
import { useRouter } from 'next/navigation'
import {useToast} from '@/hooks/use-toast';



interface CreateTaskDialogProps {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
}

function CreateTaskDialog({ open, setOpen, collection }: CreateTaskDialogProps) {
    const form = useForm<CreateTaskShemaType>({
      defaultValues: {
        // @ts-ignore
        collectionId: collection.id,
      },
      resolver: zodResolver(createTaskSchema),
    });
  
    const router = useRouter();
    const { toast } = useToast();
  
    const openChangeWrapper = (value: boolean) => {
      setOpen(value);
      form.reset();
    };
  
    const onSubmit = async (data: CreateTaskShemaType) => {
      const formattedData = JSON.parse(JSON.stringify(data));
      try {
        await createTask(data);
        openChangeWrapper(false);
        toast({
          title: "Task created successfully",
          description: "Your task has been created successfully",
          duration: 5000,
          variant: "default",
        });
      } catch (error) {
        console.error("Error creating task:", error);
        toast({
          title: "Error creating task",
          description: "An error occurred while creating your task",
          duration: 5000,
          variant: "destructive",
        });
      } finally {
        openChangeWrapper(false);
        router.push("/dashboard");
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={openChangeWrapper}>
        <DialogContent className="sm:max-w-[425px] bg-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>
              Create a New Task : 
              <span
                className={cn(
                  "p-[1px] bg-clip-text text-transparent text-md ml-2",
                  CollectionColors[collection.color as CollectionColor]
                )}
              >
                {collection.name}
              </span>
            </DialogTitle>
            <DialogDescription>Add a task to your collection</DialogDescription>
          </DialogHeader>
          <div className="gap-4 py-4">
            <Form {...form}>
              <form
                className="space-y-4 flex flex-col"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="content" className="text-right">
                        Content
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Do some groceries"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-50">
                        Task Content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="expiresAt" className="text-right">
                        Expires At
                      </FormLabel>
                      <FormDescription className="text-gray-50">
                        When should this task expire?
                      </FormDescription>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              className={cn(
                                "justify-start text-left font-normal w-full",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <SlCalender className="mr-2 h-4 w-4" />
                              {field.value && format(field.value, "dd/MM/yyyy")}
                              {!field.value && (
                                <span className="text-muted-foreground">
                                  No Expiration
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
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
              </form>
            </Form>
          </div>
          <DialogFooter>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={form.formState.isSubmitting}
              variant={"outline"}
              className={cn(
                "w-full dark:text-white text-black",
                CollectionColors[collection.color as CollectionColor]
              )}
            >
              Confirm
              {form.formState.isSubmitting && (
                <LoaderCircle className="animate-spin ml-2 h-4 w-4" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default CreateTaskDialog;
  
