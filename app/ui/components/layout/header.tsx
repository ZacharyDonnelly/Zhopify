import { getCart } from "@/lib/db/cart";
import CartButton from "@/ui/components/layout/CartButton";
import Link from "next/link";

interface HeaderProps {
  className: string;
}

const Header: React.FC<HeaderProps> = async ({ className }) => {
  const cart = await getCart();

  return (
    <nav className={`min-h-[163px] h-[163px] pt-3 pb-2 px-20 ${className}`}>
      <div className="w-full h-full flex items-center">
        <div className="w-[726px] pl-4">
          <ul className="leading-10 flex gap-x-6 text-lg items-center whitespace-nowrap overflow-visible">
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <Link href="/">Home</Link>
            </li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <Link href="/products">Shop</Link>
            </li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <Link href="/products">Collections</Link>
            </li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <Link href="/add-product">Add Product</Link>
            </li>
          </ul>
        </div>
        <div className="w-[276px]">
          <Link href="/">
            <header className="flex items-center justify-center">
              <h1 className="text-3xl leading-6 font-bold font-sans text-[#ff4f0f] self-center tracking-tighter">
                Zhopify
              </h1>
              <span className="ml-1 text-3xl text-[#ff4f0f] font-bold leading-6 -mt-2">
                ®
              </span>
            </header>
          </Link>
        </div>
        <div className="w-[724px] pr-4">
          <ul className="leading-10 flex justify-end gap-x-6 text-lg items-center whitespace-nowrap">
            <li className="cursor-pointer hover:text-[#ff4f0f]">Log In</li>
            <li className="cursor-pointer flex items-center">
              {/* <p className="text-sm">Cart</p> */}
              <CartButton cart={cart} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
