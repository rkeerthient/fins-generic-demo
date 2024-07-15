import { EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { GoogleMaps, LocationMap } from "@yext/pages-components";
import StaticMap from "./static-map";
import Cta from "./cta";
export interface Coordinate {
  latitude: string;
  longitude: string;
}
type LetsTalkProps = {
  description: string;
  phone: string;
  emails: string[];
  geoCodedCoordinate: Coordinate;
};
const LetsTalk = ({
  description,
  phone,
  emails,
  geoCodedCoordinate,
}: LetsTalkProps) => {
 
  return (
    <article className="flex gap-8">
      <article className="w-1/2 flex flex-col gap-8 my-auto">
        <p>{description}</p>
        <p className="flex gap-4 items-center">
          <p className="flex items-center">
            <PhoneIcon className="h-4 w-4 mr-1" /> {phone}
          </p>

          <p className="flex  items-center ml-16">
            <EnvelopeOpenIcon className="h-4 w-4 mr-1" /> {emails[0]}
          </p>
        </p>
        <Cta
          buttonText={"Request an Appointment"}
          style={"secondary"}
          url={""}
          classNames=" w-fit px-2 py-1.5 md:px-4 md:py-2  text-sm md:text-base rounded-md mt-4"
        ></Cta>
      </article>
      <StaticMap
        latitude={geoCodedCoordinate.latitude}
        longitude={geoCodedCoordinate.longitude}
      />
    </article>
  );
};

export default LetsTalk;
