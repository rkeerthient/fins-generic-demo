import { Image } from "@yext/pages-components";
import { C_heroBanners } from "../types/site";
import Cta from "./cta";

const Hero = ({ c_heroBanners }: any) => {
  const c_heroBanner: C_heroBanners = c_heroBanners[0];
  const {
    cTA: { label, linkType, link },
  } = c_heroBanners[0];

  return (
    <div
      aria-label="Hero section"
      className="w-full md:h-[400px] relative flex items-center justify-center md:justify-start"
    >
      <h2 className="sr-only">Hero section</h2>
      <Image
        image={c_heroBanner.backgroundImage!}
        layout="fill"
        className="absolute z-0 !object-top	h-full"
      />
      <section className="bg-white md:p-6 md:ml-16 border rounded-md w-full md:w-1/3 flex flex-col gap-2 md:gap-0 mx-6 my-12 p-4 z-10">
        <h3>{c_heroBanner.name}</h3>
        <p className="md:text-base text-[12px] ">{c_heroBanner.description}</p>
        <Cta
          type={"Guided search"}
          buttonText={label}
          url={link}
          style="primary"
          classNames="mt-4 bg-primary text-white w-fit px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md  "
        />
      </section>
    </div>
  );
};

export default Hero;
