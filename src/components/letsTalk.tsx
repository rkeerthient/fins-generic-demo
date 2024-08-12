import { EnvelopeOpenIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { GoogleMaps, LocationMap } from "@yext/pages-components";
import StaticMap from "./static-map";
import Cta from "./cta";
import { FormatEmail, FormatPhoneNumber } from "../common/util";
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
    <article className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
      <article className="md:w-1/2 flex flex-col gap-2 md:gap-8 my-auto">
        <p>
          {description.length <= 65
            ? `We feel a deep responsibility to our clients. We are committed to helping you protect and grow your assets, and in many cases, prepare families and heirs for the transfer of wealth to future generations. We know how hard you are working to achieve your goals, and we will work with you to help your wealth support your continued prosperity over time.`
            : description}
        </p>
        <p className="flex flex-col md:flex-row gap-4 items-center">
          <FormatPhoneNumber mainPhone={phone} />
          <FormatEmail email={emails[0]} />
        </p>

        <Cta
          buttonText={"Request an Appointment"}
          style={"primary"}
          url={""}
          classNames="mx-auto md:mx-0 w-fit px-2 py-1.5 md:px-4 md:py-2  text-sm md:text-base rounded-md mt-4"
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
