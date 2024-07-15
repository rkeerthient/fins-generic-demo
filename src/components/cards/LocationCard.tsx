import { CardProps } from "@yext/search-ui-react";
import { BsClock, BsGlobe, BsPin } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { LiaDirectionsSolid } from "react-icons/lia";
import HoursText from "../HoursText";
import { useLocationsContext } from "../../common/LocationsContext";
import { useEffect, useRef } from "react";
import { Location } from "../../types/locations";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Cta from "../cta";

const LocationCard = ({ result }: CardProps<Location>) => {
  const { setSelectedLocationId, selectedLocationId } = useLocationsContext();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  const { name, distance, index } = result;
  const { slug, landingPageUrl, address, id, hours, timezone, mainPhone } =
    result.rawData;
  console.log(JSON.stringify(hours));

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
      <section className="relative flex bg-white  p-4">
        <section className="px-2 flex flex-col gap-3 w-full">
          <h2 className="flex items-center ">
            <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
              {index!}
            </span>
            {name}
            <p className="ml-auto">{(distance! / 1609).toFixed(2)} mi</p>
          </h2>
          <p className="!text-sm">
            {hours ? (
              <HoursText timezone={timezone} hours={hours} />
            ) : (
              <p>Fill in your hours</p>
            )}
          </p>
          <section className="text-[#333333] pointer-events-none flex gap-24 justify-center md:justify-start  leading-loose items-center text-sm  ">
            <p className="flex flex-col ">
              <p>{address.line1}</p>
              <p>
                {address.city}, {address.region} {address.postalCode}
              </p>
            </p>
            <p className="flex flex-col ">
              <p className="flex items-center">
                <PhoneIcon className="h-4 w-4 text-primary" />
                {mainPhone && (
                  <span className="ml-2">
                    {mainPhone
                      .replace("+1", "")
                      .replace(/\D+/g, "")
                      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                  </span>
                )}
              </p>

              <p className="flex items-center text-[#333333]">
                <EnvelopeIcon className="h-4 w-4 text-primary" />
                <span className="ml-2">capital-nyc@capital.com</span>
              </p>
            </p>
          </section>
          <section className="pointer-events-none flex gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <Cta
              buttonText="Get In Touch"
              style="primary"
              url={getDirectionsUrl(address)}
              classNames=" md:px-4  md:py-1  md:text-sm rounded-md"
            />

            <Cta
              buttonText={"View Page"}
              style="secondary"
              url={`/${slug}`}
              classNames=" md:px-4  md:py-1  md:text-sm rounded-md"
            />
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
