import { Image } from "@yext/pages-components";
import { C_heroBanners } from "../types/site";
import Cta from "./cta";

const Hero = ({ c_heroBanners }: any) => {
  console.log(JSON.stringify(c_heroBanners));
  const c_heroBanner: C_heroBanners = c_heroBanners[0];
  const {
    cTA: { label, linkType, link },
  } = c_heroBanners[0];
  console.log(c_heroBanner.backgroundImage);

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
      <section className="bg-white md:p-8 md:ml-16 border rounded-md w-full md:w-1/3 flex flex-col gap-2 md:gap-4 mx-6 my-12 p-4 z-10">
        <h2 className="md:text-2xl font-bold text-lg">{c_heroBanner.name}</h2>
        <p className="md:text-base text-[12px] ">{c_heroBanner.description}</p>
        <Cta buttonText={label} url={link} style="primary" />
      </section>
    </div>
  );
};

export default Hero;
