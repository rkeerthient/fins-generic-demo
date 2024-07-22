import { Address, Hours } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import HoursText from "./HoursText";
import { getDirectionsUrl } from "./cards/LocationCard";
import Cta from "./cta";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { FormatAddress, FormatPhoneNumber } from "../common/util";

type LocCardData = {
  name: string;
  slug: string;
  address: Address;
  mainPhone: string;
  hours: Hours;
  id: string;
  distance: number;
  timezone: string;
};

const NearByLocations = () => {
  const [nearbyLocations, setNearbyLocations] = useState<LocCardData[]>([]);

  useEffect(() => {
    const getLocNearMe = async () => {
      const req = await fetch(
        `https://liveapi.yext.com/v2/accounts/me/search/vertical/query?verticalKey=locations&input=locations%20near%20me&version=PRODUCTION&locale=en&api_key=${import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY}&experienceKey=fins_universal-search&v=20220701&limit=3`
      );
      const resp = await req.json();
      const _nearbyLocations: LocCardData[] = resp.response.results
        ?.slice(0, 3)
        .map((item: any) => {
          const { distance } = item;
          const { name, slug, address, mainPhone, timezone, hours, id } =
            item.data;

          return {
            name,
            slug,
            address,
            mainPhone,
            hours,
            id,
            distance,
            timezone,
          };
        });
      setNearbyLocations(_nearbyLocations);
    };

    getLocNearMe();
  }, []);

  return (
    <>
      {nearbyLocations && (
        <article className="flex flex-col md:flex-row w-full justify-between gap-8">
          {nearbyLocations.map((item: LocCardData) => {
            const {
              name,
              slug,
              address,
              mainPhone,
              hours,
              timezone,
              distance,
            } = item;

            return (
              <section
                key={item.id}
                className="py-4 p-4 border text-sm space-y-4"
              >
                <h2 className=" text-base font-bold flex justify-between items-center gap-16">
                  {name} - {address.city}
                  <p className="text-gray-400 text-sm font-medium">
                    {(distance! / 1609).toFixed(2)} mi
                  </p>
                </h2>
                <HoursText hours={hours} timezone={timezone} />
                <FormatAddress address={address} />
                <FormatPhoneNumber mainPhone={mainPhone} />
                <section className="mt-4 flex gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
                  <Cta
                    buttonText="Get In Touch"
                    style="primary"
                    url={getDirectionsUrl(address)}
                    classNames="md:px-4  md:py-1  md:text-sm rounded-md"
                  />

                  <Cta
                    buttonText={"View Page"}
                    style="secondary"
                    url={`/${slug}`}
                    classNames="md:px-4  md:py-1  md:text-sm rounded-md"
                  />
                </section>
              </section>
            );
          })}
        </article>
      )}
    </>
  );
};

export default NearByLocations;
