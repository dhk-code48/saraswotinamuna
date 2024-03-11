"use server";

import db from "@/lib/prismadb";
import { DonorSchema } from "@/schemas";
import * as z from "zod";

export const createDonor = async (values: z.infer<typeof DonorSchema>) => {
  const validatedFields = DonorSchema.safeParse(values);
  const siteId = process.env.NEXT_SITEID;

  if (!validatedFields.success || !siteId) {
    return { error: "Invalidate Data" };
  }

  const { name, imageUrl, amount } = validatedFields.data;

  try {
    await db.donor.create({
      data: {
        imageUrl,
        name,
        amount,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Donor Created Success" };
};
