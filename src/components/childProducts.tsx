import { Image } from "@yext/pages-components";
import { Image as _Image } from "@yext/types";
import Cta from "./cta";

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
            <section
              className="flex flex-col border p-4 gap-2 md:gap-4"
              key={id}
            >
              <h2 className="text-lg font-medium">{name}</h2>
              <p className="text-sm md:h-24">{c_serviceDescription}</p>
              <nav className=" flex flex-col md:flex-row gap-2 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
                <Cta
                  buttonText="Learn more"
                  style="secondary"
                  url={`/${slug}`}
                  classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1"
                />
              </nav>
            </section>
          );
        })}
    </article>
  );
};

export default ChildProducts;
