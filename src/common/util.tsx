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
        <p className="flex items-center">
          <PhoneIcon className="h-4 w-4 text-primary" />
          <span className="ml-2">
            {mainPhone
              .replace(/\+1/, "")
              .replace(/\D+/g, "")
              .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}{" "}
          </span>
        </p>
      )}
    </>
  );
};

export const FormatAddress = ({ address }: UtilsProps) => {
  return (
    <>
      {address && (
        <p className="flex items-center">
          <MapPinIcon className="h-4 w-4 -mt-4 text-primary" />
          <span className="ml-2 flex flex-col">
            <p>{address.line1}</p>
            <p>
              {address.city}, {address.region} {address.postalCode}
            </p>
          </span>
        </p>
      )}
    </>
  );
};

export const FormatEmail = ({ emails }: UtilsProps) => {
  return (
    <>
      {emails && (
        <p className="flex items-center">
          <EnvelopeIcon className="h-4 w-4 text-primary" />
          <span className="ml-2">
            {emails.length >= 1 ? emails[0] : `capital-nyc@capital.com`}
          </span>
        </p>
      )}
    </>
  );
};
