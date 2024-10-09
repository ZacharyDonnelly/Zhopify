"use server";

import { revalidatePath } from "next/cache";

export const setProductQuantity = async (
  productId: string,
  quantity: number,
) => {
  revalidatePath("/cart");
};
