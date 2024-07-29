import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Address } from "../types/locations";

type UtilsProps = {
  mainPhone?: string;
  address?: Address;
  emails?: string[];
};

export const FormatPhoneNumber = ({ mainPhone }: UtilsProps) => {
  return (
    <>
      {mainPhone && (
        <section className="flex items-center" aria-label="Phone number">
          <h2 className="sr-only">Phone number</h2>
          <PhoneIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="ml-2">
            {mainPhone
              .replace(/\+1/, "")
              .replace(/\D+/g, "")
              .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
          </span>
        </section>
      )}
    </>
  );
};

export const FormatAddress = ({ address }: UtilsProps) => {
  return (
    <>
      {address && (
        <address
          className="flex md:mx-auto mr-auto items-center not-italic"
          aria-label="Address"
        >
          <h2 className="sr-only">Address</h2>
          <MapPinIcon
            className="h-4 w-4 -mt-4 text-primary"
            aria-hidden="true"
          />
          <span className=" ml-2">
            <p>{address.line1}</p>
            <p>
              {address.city}, {address.region} {address.postalCode}
            </p>
          </span>
        </address>
      )}
    </>
  );
};

export const FormatEmail = ({ emails }: UtilsProps) => {
  return (
    <>
      {emails && (
        <address className="flex items-center not-italic">
          <h2 className="sr-only">Email</h2>
          <EnvelopeIcon className="h-4 w-4 text-primary" />
          <span className="ml-2">
            {emails.length >= 1 ? emails[0] : `capital-nyc@capital.com`}
          </span>
        </address>
      )}
    </>
  );
};
