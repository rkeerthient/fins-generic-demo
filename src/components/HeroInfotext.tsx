import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

export interface HeroInfoProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  line1?: string;
  line2?: string;
  phone?: string;
  email?: string;
  textColor?: string;
}
const HeroInfo = ({
  title,
  subtitle,
  line1,
  line2,
  phone,
  email,
  textColor,
}: HeroInfoProps) => {
  return (
    <div
      className={`flex flex-col items-center gap-3 md:gap-4 text-[${textColor}]`}
    >
      <div className="text-2xl md:text-4xl font-semibold md:font-bold">
        {title}
      </div>
      <div className="text-base md:text-lg font-bold">{subtitle}</div>
      <div className="text-sm md:text-base font-normal flex flex-col items-center">
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
      <span className="hidden md:block">
        <div className="text-base font-normal flex flex-row gap-2 items-center">
          <BsTelephone />
          <p className="">{phone}</p>
          <p>{"|"}</p>
          <HiOutlineMail className=" h-fit" />
          <p className="">{email}</p>
        </div>
      </span>
      <span className="block md:hidden">
        <div className="flex flex-col text-sm gap-2">
          <div className="flex gap-2 items-center justify-center">
            <BsTelephone className="  h-4 w-4" />
            <div>{phone}</div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <HiOutlineMail className="  h-4 w-4" />
            <div> {email}</div>
          </div>
        </div>
      </span>
      <button
        className={`bg-white hover:bg-slate-100 !text-blue border-blue font-normal text-sm md:text-base py-2 px-4 md:py-2 md:px-8 rounded w-full md:w-fit text-brand-blue`}
      >
        Request An Appointment
      </button>
    </div>
  );
};

export default HeroInfo;
