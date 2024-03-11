"use server";

import db from "@/lib/prismadb";
import { SubCategory } from "@prisma/client";

const getSubCategories = async (): Promise<SubCategory[] | null> => {
  const siteId = process.env.NEXT_SITEID;

  if (!siteId) {
    return null;
  }

  let subcategories: SubCategory[] | null;

  try {
    subcategories = await db.subCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return null;
  }

  return subcategories;
};
export default getSubCategories;
