import { EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";
import { TemplateProps } from "@yext/pages/*";
import Cta from "./cta";
export interface HeroBannerProps {
  document: any;
  isProfessional?: boolean;
}

const HeroBanner = ({ document, isProfessional = false }: HeroBannerProps) => {
  const {
    photoGallery,
    name,
    description,
    headshot,
    title,
    address,
    mainPhone,
    fins_jobTitle,
    emails,
  } = document;
  return (
    <>
      <article
        aria-label="Hero section"
        className="w-full md:h-[600px] relative"
      >
        <h2 className="sr-only">Hero section</h2>
        <Image
          image={photoGallery?.[0]}
          className=" !absolute !h-full !max-w-none"
        />
        <article className=" w-full absolute bg-black bg-opacity-75 flex items-center justify-center flex-col h-full text-white top-0 left-0 z-2">
          <section className="md:p-8 md:ml-16  w-full md:w-1/3 flex  gap-4 md:gap-4 mx-6 my-12 p-4   text-white">
            {isProfessional && (
              <Image
                image={headshot}
                layout="fixed"
                className="!w-80 rounded-full !max-w-none !h-auto"
              ></Image>
            )}
            <article className="flex flex-col gap-2">
              <h2 className="md:text-2xl font-bold text-lg">{name}</h2>
              <p>{fins_jobTitle}</p>
              <p>
                {address.line1} {address?.line2}
              </p>
              <p>
                {address.city}, {address.region} {address.postalCode}
              </p>
              <p className="flex gap-4 items-center">
                <p className="flex   items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" /> {mainPhone}
                </p>
                <p>|</p>
                {emails && (
                  <p className="flex  items-center">
                    <EnvelopeOpenIcon className="h-4 w-4 mr-1" /> {emails[0]}
                  </p>
                )}
              </p>
              <Cta
                buttonText={"Book an Appointment"}
                style={"secondary"}
                url={""}
                classNames=" w-fit px-2 py-1.5 md:px-4 md:py-2  text-sm md:text-base rounded-md mt-4"
              />
            </article>
          </section>
        </article>
      </article>
    </>
  );
};

export default HeroBanner;
