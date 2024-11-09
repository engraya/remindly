"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCollectionSchema,
  CreateCollectionSchemaType,
} from "@/db/createCollection";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "./ui/select";
import { createCollection } from "@/db/actions";
import { CollectionColors, CollectionColor } from "@/lib/constants";
import { Separator } from "./ui/separator";
import { LoaderCircle } from "lucide-react";

type CreateCollectionSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateCollectionSheet = ({
  open,
  onOpenChange,
}: CreateCollectionSheetProps) => {
  const { toast } = useToast();

  const form = useForm<CreateCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  });

  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  const onSubmit = async (data: CreateCollectionSchemaType) => {
    const formattedData = JSON.parse(JSON.stringify(data));
    try {
      await createCollection(formattedData);
      openChangeWrapper(false);
      toast({
        title: "Collection created successfully",
        description: "Your collection has been created successfully",
        duration: 5000,
        variant: "default",
      });
    } catch (error) {
      console.error("Error creating collection:", error);
      toast({
        title: "Error creating collection",
        description: "An error occurred while creating your collection",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      openChangeWrapper(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle className="text-gray-50">
            Create a New Collection
          </SheetTitle>
          <SheetDescription className="text-gray-200 mb-6">
            Make new changes to your collection here.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-right">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription className="text-gray-50">
                    Collection Name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="color"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          `w-full h-8 text-white `,
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="Color"
                          className="w-full h-8 text-black"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              `w-full h-8 cursor-pointer text-center rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-neutral-600 focus:ring-inset dark:focus:ring-white focus:px-8`,
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-gray-50">
                    Select a Color Tag for your Collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex flex-col gap-3 mt-4">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            type="submit"
            className={cn(
              form.watch("color") &&
                CollectionColors[form.getValues("color") as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            <span className="text-slate-950">Submit</span>
            {form.formState.isSubmitting && <LoaderCircle className="animate-spin  ml-2" />}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCollectionSheet;
