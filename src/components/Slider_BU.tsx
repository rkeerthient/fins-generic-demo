import { useState, useEffect } from "react";
import Cta, { CtaProps } from "./cta";
import { Image } from "@yext/pages-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type SliderProps = {
  title: string;
  sliderData: SliderData[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

type SliderData = {
  id: string;
  name: string;
  slug: string;
  cta: CtaProps;
  description: string;
  image: string;
};

const Slider = ({
  title,
  sliderData,
  autoSlide = true,
  autoSlideInterval = 3000,
}: SliderProps) => {
  console.log(JSON.stringify(sliderData));
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) =>
      curr === 0 ? Math.ceil(sliderData.length / 3) - 1 : curr - 1
    );
  const next = () =>
    setCurr((curr) =>
      curr === Math.ceil(sliderData.length / 3) - 1 ? 0 : curr + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  return (
    <section className="max-w-screen-xl mx-auto">
      <h2>{title}</h2>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform ease-out duration-500 gap-8"
          // style={{ transform: `translateX(-${(curr * 100) / 3}%)` }}
        >
          {sliderData?.map((item: SliderData, index: number) => {
            const { id } = item;
            return (
              <div key={id} style={{ flex: `0 0 ${100 / 3}%` }}>
                <Slide data={item} isLogo={true} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeftIcon width={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRightIcon width={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: Math.ceil(sliderData.length / 3) }).map(
            (_, i) => (
              <div
                key={i}
                className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
              />
            )
          )}
        </div>
      </div> */}
    </section>
  );
};

export default Slider;

const Slide = ({ data, isLogo }: any) => {
  const { fins_servicesImage, name, id, slug, c_serviceDescription } = data;
  return (
    <section className="bg-white border [&:not(:first-child)]:ml-8 flex flex-col gap-4 pb-4 h-[460px]">
      <Image
        image={fins_servicesImage}
        className="!aspect-square"
        layout="fixed"
        height={275}
      ></Image>
      <h3 className="px-4 text-xl font-bold ">{name}</h3>
      <p className=" px-4">{c_serviceDescription}</p>
      <Cta
        buttonText={"Learn more"}
        url={slug}
        style="primary"
        classNames="ml-4"
      ></Cta>
    </section>
  );
};
