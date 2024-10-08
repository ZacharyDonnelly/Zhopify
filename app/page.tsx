import { prisma } from "@/lib/db/prisma";
import "@/lib/utils/env";
import Banner from "@/ui/components/banner";
import ProductCard from "@/products/[id]/productCard";

const PRODUCT_CARD_MOCK_DATA = [
  {
    id: 1,
    title: "Scooter",
    price: "$100",
  },
  {
    id: 2,
    title: "Tent",
    price: "$200",
  },
  {
    id: 3,
    title: "Kayak",
    price: "$300",
  },
  {
    id: 4,
    title: "Beanie",
    price: "$400",
  },
  {
    id: 5,
    title: "Wallet",
    price: "$500",
  },
  {
    id: 6,
    title: "Bug Spray",
    price: "$600",
  },
];

const Home: React.FC = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <section className="w-full pt-1">
      <Banner />
      <div className="w-full flex justify-center mt-14 mb-14">
        <section className="max-w-[928px] h-auto flex lg:flex-row gap-x-7 flex-wrap justify-center">
          {products.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
};

export default Home;
