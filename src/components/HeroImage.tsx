import { Image } from "@yext/pages-components";
export interface HeroImageProps {
  src: any;
}

const HeroImage = ({ src }: HeroImageProps) => {
  const leftPaddingVariants = {
    "0": "pl-0",
    "1": "pl-1",
    "2": "pl-2",
    "3": "pl-3",
    "4": "pl-4",
    "5": "pl-5",
    "6": "pl-6",
    "7": "pl-7",
    "8": "pl-8",
    "9": "pl-9",
    "10": "pl-10",
    "20": "pl-20",
  };
  return <div className="col-start-2 row-span-2 self-center"></div>;
};
export default HeroImage;
