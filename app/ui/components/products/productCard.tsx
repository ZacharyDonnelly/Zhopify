type ProductCardProps = {
  title: string;
  price: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ title, price }) => {
  return (
    <div className='flex flex-col mb-10'>
      <div className='flex w-[290px] h-[217.5px] border-x-2 border-y-2 border-black bg-blue-900 justify-center cursor-pointer'>
        <p className='self-center text-white font-bold'>Card Img</p>
      </div>
      <div className='mt-2 flex gap-y-1 flex-col'>
        <h3 className='font-semibold text-lg'>{title}</h3>
        <p className='font-medium'>{price}</p>
        <p className='text-xs'>Free Shipping</p>
      </div>
      <button
        type='button'
        className='w-full h-9 mt-2 bg-[#ff4f0f] border-[#ff4f0f] text-white font-semibold rounded-md cursor-pointer'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
