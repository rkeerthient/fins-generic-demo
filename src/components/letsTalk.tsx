import { FormatEmail, FormatPhoneNumber } from "../common/util";
import Cta from "./cta";
import StaticMap from "./static-map";
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
      <section className="md:w-1/2 flex flex-col gap-2 md:gap-8 my-auto">
        <p>
          {!description || description.length <= 60
            ? `Welcome to Capital Bank, where your financial goals become our mission. At Capital Bank, we offer a comprehensive range of services to meet your banking needs. From retail banking solutions designed for your everyday transactions to mortgage and lending services to help you achieve your dream home, we've got you covered. Our dedicated team of experts specializes in wealth management, ensuring your financial future is secure and prosperous. For businesses, our business banking services provide tailored solutions to fuel your growth and success. At Capital Bank, we are committed to delivering excellence in banking, putting you on the path to financial success.`
            : description}
        </p>
        <address className="flex flex-col md:flex-row gap-4 items-center">
          <FormatPhoneNumber mainPhone={phone} />
          <FormatEmail email={emails?.[0]} />
        </address>

        <Cta
          buttonText={"Request an Appointment"}
          style={"primary"}
          url={""}
          classNames="mx-auto md:mx-0 w-fit px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md mt-4"
        />
      </section>
      <StaticMap
        latitude={geoCodedCoordinate.latitude}
        longitude={geoCodedCoordinate.longitude}
      />
    </article>
  );
};

export default LetsTalk;
