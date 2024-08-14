import {
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import HoursText from "../HoursText";
import Cta from "../cta";
import { FormatAddress, FormatPhoneNumber } from "../../common/util";

const ProfessionalCardUniv = ({ result }: CardProps<any>) => {
  const { name } = result;
  const {
    address,
    headshot,
    mainPhone,
    hours,
    landingPageUrl,
    timezone,
    emails,
    fins_jobTitle,
    slug,
  } = result.rawData || result;

  return (
    <article className="border rounded-lg">
      <header className="relative flex flex-col bg-white">
        <figure className="group aspect-square block overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 bottom-12  w-full">
          {headshot && (
            <Image
              image={headshot!}
              className="pointer-events-none !aspect-square !w-full !max-w-none !object-top rounded-t-lg "
            />
          )}
        </figure>

        <section className="px-2 flex flex-col gap-3  p-4">
          <h2>
            <a href={landingPageUrl} className="text-lg font-bold">
              {name}
            </a>
          </h2>
          <p className="pointer-events-none block font-medium ">
            {fins_jobTitle}
          </p>
          <article className="!text-sm">
            {hours ? (
              <HoursText timezone={timezone} hours={hours} />
            ) : (
              <p>Fill in your hours</p>
            )}
          </article>
          <address className="pointer-events-none flex flex-col gap-2  justify-start leading-loose text-sm">
            <FormatAddress address={address} isDirectory={true} />
            <article className="flex flex-col">
              <FormatPhoneNumber mainPhone={mainPhone} />

              <span className="flex items-center ">
                <EnvelopeIcon className="h-4 w-4 text-primary" />
                {emails && <span className="ml-2">{emails[0]}</span>}
              </span>
            </article>
          </address>
          <nav className=" flex flex-col md:flex-row gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <Cta
              buttonText="Get In Touch"
              style="primary"
              url=""
              classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1"
            />

            <Cta
              buttonText="View Profile"
              style="secondary"
              url={`/${slug}`}
              classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1"
            />
          </nav>
        </section>
      </header>
    </article>
  );
};

export default ProfessionalCardUniv;
