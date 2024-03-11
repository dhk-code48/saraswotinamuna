"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { Donor } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { DonorSchema } from "@/schemas";
import { updateAuthor } from "@/actions/updateAuthor";
import { createAuthor } from "@/actions/createAuthor";
import { deleteAuthor } from "@/actions/deleteAuthor";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { deleteDonor } from "@/actions/deleteDonor";
import { updateDonor } from "@/actions/updateDonor";
import { createDonor } from "@/actions/createDonor";

type DonorFormValues = z.infer<typeof DonorSchema>;

interface DonorFormProps {
  initialData: Donor | null;
}

export const DonorForm: React.FC<DonorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const title = initialData ? "Edit donor" : "Create donor";
  const description = initialData ? "Edit a donor." : "Add a new donor";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<DonorFormValues>({
    resolver: zodResolver(DonorSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof DonorSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      initialData &&
        updateDonor(values, { donorId: initialData.id })
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign(window.location.toString());
            }
          })
          .catch(() => setError("Something went wrong"));
      !initialData &&
        createDonor(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              window.location.assign("/admin/donors/");
            }
          })
          .catch(() => setError("Something went wrong"));
    });
  };

  const onDelete = async () => {
    startTransition(() => {
      confirm("Do You want to delete this section") &&
        initialData &&
        deleteDonor(initialData.id)
          .then((data) => {
            if (data?.error) {
              alert("ERROR WHILE DELETING");
            }

            if (data?.success) {
              window.location.assign("/superadmin/donors/");
            }
          })
          .catch(() => alert("ERROR WHILE DELETING"));
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isPending}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Donation Amount"
                      type="number"
                      {...field}
                      onChange={(e) => form.setValue("amount", parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
