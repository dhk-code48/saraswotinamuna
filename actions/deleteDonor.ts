"use server";

import db from "@/lib/prismadb";

export const deleteDonor = async (donorId: string) => {
  try {
    await db.donor.delete({
      where: {
        id: donorId,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  return { success: "donor Deleated Success" };
};
