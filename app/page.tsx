import { prisma } from "@/lib/db/prisma";
import Banner from "@/lib/ui/components/banner";
import "@/lib/utils/env";
import ProductCard from "@/products/[id]/productCard";

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
