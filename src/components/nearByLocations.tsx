import { Address, Hours } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { FormatAddress, FormatPhoneNumber } from "../common/util";
import HoursText from "./HoursText";
import Cta from "./cta";
import { getDirectionsUrl } from "./cards/LocationCard";

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
                className="py-4 p-4 border text-sm space-y-2 md:space-y-4 w-full md:w-1/3"
              >
                <h3 className="flex gap-2 md:justify-between md:items-center flex-col md:flex-row">
                  {name} - {address.city}
                  <p className="text-tertiary-text text-sm font-medium">
                    {(distance! / 1609).toFixed(2)} mi
                  </p>
                </h3>
                <HoursText hours={hours} timezone={timezone} />
                <FormatAddress address={address} />
                <FormatPhoneNumber mainPhone={mainPhone} />
                <nav className=" flex flex-col md:flex-row gap-2 md:gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
                  <Cta
                    buttonText="Get Directions"
                    style="primary"
                    url={getDirectionsUrl(address)}
                    classNames="md:px-6 md:py-1.5 md:text-sm rounded-md px-2 py-1"
                  />
                  <Cta
                    buttonText={"View Page"}
                    style="secondary"
                    url={`/${slug}`}
                    classNames="md:px-6 md:py-1.5 md:text-sm rounded-md px-2 py-1"
                  />
                </nav>
              </section>
            );
          })}
        </article>
      )}
    </>
  );
};

export default NearByLocations;
