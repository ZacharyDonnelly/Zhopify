import { prisma } from "@/lib/db/prisma";
import NextImage from "@/ui/components/nextImage";
import PriceTag from "@/ui/components/priceTag";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

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
      </div>
    </div>
  );
};

export default ProductPage;
