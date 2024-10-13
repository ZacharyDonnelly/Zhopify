import { prisma } from "@/lib/db/prisma";
import FormSubmitButton from "@/lib/ui/components/FormSubmitButton";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Add Product - Zhopify",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

const AddProductPage: React.FC = () => {
  return (
    <div className="w-full px-16 flex flex-col justify-center items-center mb-10">
      <h1 className="mb-3 text-lg font-bold underline">Add Product</h1>
      <form action={addProduct} className="w-[500px] flex flex-col">
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full border-2 border-black rounded-md pl-2"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full border-2 border-black rounded-md pl-2"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full border-2 border-black rounded-md pl-2"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full border-2 border-black rounded-md pl-2"
        />
        <FormSubmitButton className="btn btn-primary">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
