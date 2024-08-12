import { Result } from "@yext/search-headless-react";
import { LngLatLike, Popup, Map } from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { renderToString } from "react-dom/server";
import { getDirectionsUrl } from "./cards/LocationCard";
import Cta from "./cta";
import Location, { Coordinate } from "../types/locations";
import { FormatEmail, FormatPhoneNumber } from "../common/util";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location, index: any) => {
  const {
    address: { line1, line2, city, region, postalCode },
    name,
    mainPhone,
    landingPageUrl,
    slug,
  } = location;
  const address = location.address;
  const html = (
    <section className="space-y-2  p-3 text-base">
      <a
        href={landingPageUrl}
        className=" outline-transparent text-primary text-lg flex hover:underline items-center"
      >
        <h2 className="flex gap-1 items-center">
          <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
            {index! + 1}
          </span>
          {name}
        </h2>
      </a>
      <p>{line1}</p>
      <p>{`${city}, ${region}, ${postalCode}`}</p>
      <FormatPhoneNumber mainPhone={mainPhone} />
      <FormatEmail />
      <section className="pointer-events-none flex gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
        <Cta
          buttonText="Get Directions"
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
  );

  return renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<Location>;
  index: number;
  selectedLocationId?: string;
  selectedLocationFromContext?: string;
  setSelectedLocationId: (value: string) => void;
}

const MapPin = ({
  mapbox,
  result,
  index,
  selectedLocationId,
  selectedLocationFromContext,
  setSelectedLocationId,
}: MapPinProps) => {
  const location = result.rawData;
  const [isActive, setIsActive] = useState<boolean>();
  const popupRef = useRef(new Popup({ offset: 15 }));
  useEffect(() => {
    if (selectedLocationFromContext) {
      document
        .querySelectorAll(".mapboxgl-popup")
        .forEach((item) => item.remove());

      setIsActive(selectedLocationFromContext === result.id);
    }
  }, [selectedLocationFromContext, result.id]);

  useEffect(() => {
    if (isActive && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setMaxWidth("fit-content")
          .setHTML(getLocationHTML(location, index))
          .addTo(mapbox);
      }
    } else {
      popupRef.current.remove();
    }
  }, [isActive, mapbox, location]);

  const handleClick = () => {
    setSelectedLocationId(isActive ? "" : location.id);
  };

  return (
    <button onClick={handleClick}>
      <div className="relative flex items-center justify-center h-8 w-8">
        <FaLocationPin
          className={`absolute text-primary hover:text-[#147b94] w-full h-full ${isActive ? "h-10 w-10" : "h-8 w-8"}`}
        />
        <span className="absolute text-white font-bold">{index + 1}</span>
      </div>
    </button>
  );
};

export default MapPin;
