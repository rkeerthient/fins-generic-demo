import { EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";
import { TemplateProps } from "@yext/pages/*";
import Cta from "./cta";
import { FormatAddress } from "../common/util";
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
      <section
        aria-label="Hero section"
        className={`w-full ${isProfessional ? `h-[500px]` : `h-[350px]`}  md:h-[600px] relative`}
      >
        <h2 className="sr-only">Hero section</h2>
        <Image
          image={photoGallery?.[0]}
          className=" !absolute !h-full !max-w-none"
        />
        <article className=" w-full absolute bg-black bg-opacity-75 flex items-center md:justify-center flex-col h-full text-white top-0 left-0 z-2">
          <section className="md:p-8 md:ml-16  w-full md:w-1/3 flex flex-col md:flex-row gap-4 md:gap-4 mx-6 my-12 p-4   text-white justify-center  md:text-left text-center">
            {isProfessional && (
              <Image
                image={headshot}
                layout="fixed"
                className="md:!w-80 !w-24 rounded-full !max-w-none !h-auto mx-auto"
              ></Image>
            )}
            <article className="flex flex-col gap-2">
              <h2 className="md:text-2xl font-bold text-lg">{name}</h2>
              <p>{fins_jobTitle}</p>
              <FormatAddress address={address} />
              <p className="flex flex-col md:flex-row gap-4 items-center">
                <p className="flex   items-center">
                  <PhoneIcon className="h-4 w-4 mr-1" /> {mainPhone}
                </p>
                <p className="hidden md:block">|</p>
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
                classNames="mx-auto md:mx-0 w-fit px-2 py-1.5 md:px-4 md:py-2  text-sm md:text-base rounded-md mt-4"
              />
            </article>
          </section>
        </article>
      </section>
    </>
  );
};

export default HeroBanner;
