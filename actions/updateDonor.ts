"use server";

import db from "@/lib/prismadb";
import { DonorSchema } from "@/schemas";
import * as z from "zod";

export const updateDonor = async (
  values: z.infer<typeof DonorSchema>,
  { donorId }: { donorId: string }
) => {
  const validatedFields = DonorSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalidate Data" };
  }

  const { name, imageUrl, amount } = validatedFields.data;

  try {
    await db.donor.update({
      where: {
        id: donorId,
      },
      data: {
        imageUrl,
        name,
        amount,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "Donor Updated Success" };
};
