const Header: React.FC = () => {
  return (
    <nav className="min-h-[163px] h-[163px] pt-3 pb-2 px-20">
      <div className="w-full h-full flex items-center">
        <div className="w-[726px] pl-4">
          <ul className="leading-10 flex gap-x-6 text-lg items-center whitespace-nowrap overflow-visible">
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <a href="/">Home</a>
            </li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">Shop</li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">Collections</li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">
              <a href="/add-product">Add Product</a>
            </li>
          </ul>
        </div>
        <div className="w-[276px]">
          <header className="flex items-center justify-center">
            <h1 className="text-3xl leading-6 font-bold font-sans text-[#ff4f0f] self-center tracking-tighter">
              Zhopify
            </h1>
            <span className="ml-1 text-3xl text-[#ff4f0f] font-bold leading-6 -mt-2">
              ®
            </span>
          </header>
        </div>
        <div className="w-[724px] pr-4">
          <ul className="leading-10 flex justify-end gap-x-6 text-lg items-center whitespace-nowrap">
            <li className="cursor-pointer hover:text-[#ff4f0f]">Cart</li>
            <li className="cursor-pointer hover:text-[#ff4f0f]">Log In</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
