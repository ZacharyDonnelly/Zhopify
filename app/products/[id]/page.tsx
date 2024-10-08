import { prisma } from "@/lib/db/prisma";
import { incrementProductQuantity } from "@/products/[id]/actions";
import AddToCartButton from "@/products/[id]/AddToCartButton";
import NextImage from "@/ui/components/nextImage";
import PriceTag from "@/ui/components/priceTag";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `${product.name} - Zhopify`,
    description: product.description,
    openGraph: {
      url: product.imageUrl,
      images: [
        {
          url: product.imageUrl,
          width: 290,
          height: 217.5,
        },
      ],
    },
  };
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row">
      <NextImage
        src={product.imageUrl}
        alt={product.name}
        width={290}
        height={217.5}
        className="w-[290px] rounded-lg"
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
};

export default ProductPage;
