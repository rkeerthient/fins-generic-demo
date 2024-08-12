import { Image } from "@yext/pages-components";
import { Image as _Image } from "@yext/types";

type ProductProps = {
  name: string;
  id: string;
  slug: string;
  c_serviceDescription: string;
};

type ProductsProps = {
  products: ProductProps[];
};

const ChildProducts = ({ products }: ProductsProps) => {
  return (
    <article className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products
        .filter((item) => item.name !== "Find a Business Banker")
        .map((item) => {
          const { name, id, slug, c_serviceDescription } = item;
          return (
            <section className="flex flex-col border p-4" key={id}>
              <h2 className="text-lg font-medium">{name}</h2>
              <p className="text-sm">{c_serviceDescription}</p>
            </section>
          );
        })}
    </article>
  );
};

export default ChildProducts;
