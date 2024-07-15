import { Image, ThumbnailType } from "@yext/pages-components";
import { C_heroBanners } from "../types/site";
import Cta from "./cta";
import { Address } from "@yext/types";

type HeroProps = {
  name: string;
  description?: string;
  cta?: CTAProps;
  backgroundImage?: ImageProps;
  address?: Address;
  phoneNumber?: string;
};
type CTAProps = {
  label: string;
  linkType: string;
  link: string;
};

type ImageProps = {
  alternateText?: string;
  height: number;
  width: number;
  url: string;
  thumbnails?: ThumbnailType[];
};

const Hero = ({ name, description, cta, backgroundImage }: HeroProps) => {
  return (
    <div
      aria-label="Hero section"
      className="w-full md:h-[400px] relative flex items-center justify-center md:justify-start"
    >
      <h2 className="sr-only">Hero section</h2>
      <Image
        image={backgroundImage!}
        layout="fill"
        className="absolute z-0 !object-top	h-full"
      />
      <section className="bg-white md:p-8 md:ml-16 border rounded-md w-full md:w-1/3 flex flex-col gap-2 md:gap-4 mx-6 my-12 p-4 z-10">
        <h2 className="md:text-2xl font-bold text-lg">{name}</h2>
        <p className="md:text-base text-[12px] ">{description}</p>
        {cta && (
          <Cta
            buttonText={cta.label}
            url={cta.link}
            style="primary"
            classNames=" px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base rounded-md"
          />
        )}
      </section>
    </div>
  );
};

export default Hero;
