const Header: React.FC = () => {
  return (
    <nav className='min-h-[163px] h-[163px] pt-3 pb-2 px-20 flex justify-between'>
      <ul className='leading-10 flex gap-x-8 text-2xl items-center whitespace-nowrap overflow-visible'>
        <li>Home</li>
        <li>Shop</li>
        <li>Collections</li>
        <li>Our Mission</li>
      </ul>
      <header className='flex w-full ml-[435px]'>
        <h1 className='text-5xl leading-6 font-bold font-mono text-orange-400 self-center tracking-tighter'>
          Zhopify<span className='ml-1'>®</span>
        </h1>
      </header>
      <ul className='leading-10 flex gap-x-8 text-2xl items-center whitespace-nowrap'>
        <li>Cart</li>
        <li>Log In</li>
      </ul>
    </nav>
  );
};

export default Header;
