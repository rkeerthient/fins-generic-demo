import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { CardProps } from "@yext/search-ui-react";
import { useEffect, useRef } from "react";
import { useLocationsContext } from "../../common/LocationsContext";
import Location from "../../types/locations";
import Cta from "../cta";
import HoursText from "../HoursText";
import { FormatAddress, FormatPhoneNumber } from "../../common/util";

const LocationCard = ({ result }: CardProps<Location>) => {
  const { setSelectedLocationId, selectedLocationId } = useLocationsContext();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  const { name, distance, index } = result;
  const { slug, landingPageUrl, address, id, hours, timezone, mainPhone } =
    result.rawData;

  useEffect(() => {
    if (selectedLocationId === result.id) {
      listItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedLocationId, result.id]);
  return (
    <article
      className="border rounded-lg"
      ref={listItemRef}
      id={id}
      onClick={() => setSelectedLocationId(id)}
    >
      <section className="relative flex flex-col md:flex-row bg-white  p-4">
        <section className="px-2 flex flex-col gap-3 w-full">
          <h2 className="flex items-center ">
            <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
              {index!}
            </span>
            {name}
            <p className="ml-auto">{(distance! / 1609).toFixed(2)} mi</p>
          </h2>
          <article className="!text-sm">
            {hours ? (
              <HoursText timezone={timezone} hours={hours} />
            ) : (
              <p>Fill in your hours</p>
            )}
          </article>
          <section className="text-[#333333]   flex flex-col md:flex-row  md:gap-24 justify-center md:justify-start  leading-loose md:items-center text-sm  ">
            <FormatAddress address={address} />
            <article className="flex flex-col ">
              <FormatPhoneNumber mainPhone={mainPhone} />

              <p className="flex items-center text-[#333333]">
                <EnvelopeIcon className="h-4 w-4 text-primary" />
                <span className="ml-2">capital-nyc@capital.com</span>
              </p>
            </article>
          </section>
          <section className=" flex gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <Cta
              buttonText="Get Directions"
              style="primary"
              url={getDirectionsUrl(address)}
              classNames=" md:px-4  py-1 px-2  md:text-sm rounded-md"
            />

            {name !== "Capital Bank ATM" && (
              <Cta
                buttonText={"View Page"}
                style="secondary"
                url={`/${slug}`}
                classNames=" md:px-4  px-2 py-1  md:text-sm rounded-md"
              />
            )}
          </section>
        </section>
      </section>
    </article>
  );
};

export default LocationCard;
export const getDirectionsUrl = (addr?: any) => {
  const region = addr.region ? ` ${addr.region}` : ``;
  const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
  const query = encodeURIComponent(rawQuery);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
  return url;
};
