import NextImage from "@/lib/ui/components/common/nextImage";
import PriceTag from "@/lib/ui/components/common/priceTag";
import { incrementProductQuantity } from "@/products/[id]/actions";
import AddToCartButton from "@/products/[id]/AddToCartButton";
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
            <div className="badge bg-[#ff4f0f] font-semibold ml-2 align-middle mb-1">
              NEW
            </div>
          )}
        </h3>
        <PriceTag price={product.price} className="-ml-2 font-medium" />
        <p className="text-xs">Free Shipping</p>
      </div>
      <AddToCartButton
        className="mt-3 bg-[##ff4f0f]"
        productId={product.id}
        incrementProductQuantity={incrementProductQuantity}
      />
    </Link>
  );
};

export default ProductCard;
