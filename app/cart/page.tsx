import { setProductQuantity } from "@/cart/actions";
import CartEntry from "@/cart/CartEntry";
import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/utils/format";

export const metadata = {
  title: "Your Cart - Zhopify",
};

const CartPage: React.FC = async () => {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn-primary btn sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
