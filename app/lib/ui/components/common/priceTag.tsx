import { formatPrice } from "@/lib/utils/format";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({ price, className }) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
