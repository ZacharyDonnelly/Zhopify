"use client";

// import { CartItemWithProduct } from "@/lib/db/cart";

interface CartEntryProps {
  // cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}
const CartEntry: React.FC<CartEntryProps> = ({
  // cartItem: { product, quantity },
  setProductQuantity,
}) => {
  return (
    <div>
      <h1>test</h1>
    </div>
  );
};

export default CartEntry;
