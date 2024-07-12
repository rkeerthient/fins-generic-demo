import { useState, useEffect, useRef } from "react";
import Cta, { CtaProps } from "./cta";
import { Image } from "@yext/pages-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface CarouselProps {
  cards: any[];
  cardsToShow: number;
  className?: string;
}
type SliderProps = {
  title: string;
  sliderData: SliderData[];
  autoScroll?: boolean;
  intervalTime?: number;
  visibleSlides?: number;
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
  autoScroll = true,
  intervalTime = 3000,
  visibleSlides = 3,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setTransitionEnabled(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setTransitionEnabled(true);
    if (touchStartX.current - touchEndX.current > 50) {
      next();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prev();
    }
  };

  const next = () => {
    setCurrentIndex((current) => (current + 1) % sliderData.length);
  };

  const prev = () => {
    setCurrentIndex(
      (current) => (current - 1 + sliderData.length) % sliderData.length
    );
  };

  useEffect(() => {
    if (autoScroll) {
      intervalRef.current = setInterval(next, intervalTime);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoScroll, intervalTime]);

  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slideStyle = {
    transform: `translateX(-${currentIndex * (100 / 4)}%)`,
    transition: transitionEnabled ? "transform 0.5s ease-in-out" : "none",
  };

  const endIndex = currentIndex + visibleSlides;
  const visibleServices = [];
  for (let i = currentIndex; i < endIndex; i++) {
    visibleServices.push(sliderData[i % sliderData.length]);
  }
  console.log(JSON.stringify(visibleServices));

  return (
    <section
      aria-labelledby="services-heading"
      className={`overflow-hidden relative w-${100 / visibleSlides}%  mx-auto `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h1 id="services-heading" className="sr-only">
        Our Services
      </h1>
      <div className="flex " style={slideStyle}>
        {visibleServices.map((service, index) => (
          <ServiceCard key={index} data={service} />
        ))}
      </div>
    </section>
  );
};

export const ServiceCard = ({ data }: any) => {
  const { fins_servicesImage, name, id, slug, c_serviceDescription } = data;
  return (
    <article className="bg-white border [&:not(:first-child)]:ml-8 flex flex-col gap-4 pb-6 h-[490px]">
      <Image image={fins_servicesImage} className="!w-96"></Image>
      <h3 className="px-4 text-xl font-bold ">{name}</h3>
      <p className=" px-4">{c_serviceDescription}</p>
      <Cta
        buttonText={"Learn more"}
        url={slug}
        style="primary"
        classNames="ml-4"
      ></Cta>
    </article>
  );
};
export default Slider;
