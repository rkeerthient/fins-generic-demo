import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Address } from "../types/locations";

type UtilsProps = {
  mainPhone?: string;
  address?: Address;
  email?: string;
  isDirectory?: boolean;
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

export const FormatAddress = ({ address, isDirectory = false }: UtilsProps) => {
  return (
    <>
      {address && (
        <address
          className={`${isDirectory ? `mr-auto` : `mx-auto md:mr-auto md:ml-0 `} flex items-center not-italic`}
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

export const FormatEmail = ({ email }: UtilsProps) => {
  return (
    <>
      <address className="flex items-center not-italic">
        <h2 className="sr-only">Email</h2>
        <EnvelopeIcon className="h-4 w-4 text-primary" />
        <span className="ml-2">{email || "capitalfins@capitalfins.com"}</span>
      </address>
    </>
  );
};

export const formatDate = (dateString: string) => {
  if (dateString) {
    const myDate = new Date(dateString);

    const day = myDate.getDate() + 1;
    myDate.setDate(day);
    return myDate.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }
};
