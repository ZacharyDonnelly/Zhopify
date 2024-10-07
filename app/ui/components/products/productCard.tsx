import NextImage from "@/ui/components/nextImage";
import PriceTag from "@/ui/components/priceTag";
import { Product } from "@prisma/client";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isNew: boolean =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link href={"/products/" + product.id} className="flex flex-col mb-10">
      <div className="flex w-[290px] h-[217.5px] border-x-2 border-y-2 border-black bg-blue-900 justify-center cursor-pointer hover:shadow-xl transition-shadow">
        <NextImage
          src={product.imageUrl}
          width={290}
          height={217.5}
          alt={product.name}
          className="self-center w-[290px] max-w-[290px] h-[217.5px] rounded-lg max-h-[217.5px] text-white font-bold shadow-2xl"
        />
      </div>
      <div className="mt-2 flex gap-y-1 flex-col">
        <h3 className="font-semibold text-lg">
          {product.name}
          {isNew && (
            <div className="badge badge-secondary ml-2 -mt-4 mb-2">NEW</div>
          )}
        </h3>
        <PriceTag price={product.price} className="-ml-2 font-medium" />
        <p className="text-xs">Free Shipping</p>
      </div>
      <Link
        href={"/products/" + product.id}
        className="w-full flex justify-center items-center h-9 mt-2 bg-[#ff4f0f] border-[#ff4f0f] text-white font-semibold rounded-md cursor-pointer"
      >
        Add to Cart
      </Link>
    </Link>
  );
};

export default ProductCard;
