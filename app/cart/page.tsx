import { getCart } from "@/lib/db/cart";

export const metadata = {
  title: "Your Cart - Zhopify",
};

const CartPage: React.FC = async () => {
  const cart = await getCart();
  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  );
};

export default CartPage;
