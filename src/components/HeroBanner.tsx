import { Image } from "@yext/pages-components";
import { FormatAddress, FormatEmail, FormatPhoneNumber } from "../common/util";
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
          <section
            className={`md:p-8 md:ml-16  w-full ${isProfessional ? `md:w-1/2` : `md:w-fit`} flex flex-col md:flex-row gap-4 md:gap-4 mx-6 my-12 p-4   text-white justify-center  md:text-left text-center`}
          >
            {isProfessional && (
              <Image
                image={headshot}
                layout="fixed"
                className="md:!w-80 !w-24 rounded-full !max-w-none !h-auto mx-auto"
              ></Image>
            )}
            <article className="flex flex-col gap-2 w-full">
              <h2 className="text-white">{name}</h2>
              <p>{fins_jobTitle}</p>
              <FormatAddress address={address} />
              <article className="flex gap-2 flex-col md:items-start items-center md:flex-row justify-center md:justify-start">
                <FormatPhoneNumber mainPhone={mainPhone}></FormatPhoneNumber>
                <p className="hidden md:block">|</p>
                {emails && <FormatEmail email={emails[0]}></FormatEmail>}
              </article>
              <Cta
                buttonText={"Book an Appointment"}
                style={"primary"}
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
