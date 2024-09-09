// <article className="bg-white border ml-2 sm:ml-8 flex flex-col pb-6 w-[350px] h-[450px] md:h-[490px]">

import { GrNext, GrPrevious } from "react-icons/gr";
import useScrollCarousel from "../common/useScrollCarousel";
import { useEffect, useState } from "react";
import { Image } from "@yext/pages-components";
import Cta from "./cta";

export interface CarouselData {
  c_serviceDescription: string;
  fins_servicesImage: FinsServicesImage;
  id: string;
  name: string;
  slug: string;
}

export interface FinsServicesImage {
  height: number;
  url: string;
  width: number;
}

interface CarouselProps {
  data: CarouselData[];
  cardsToShow?: number; // Number of cards to display
  autoScrollInterval?: number; // Time interval for auto-scroll
}

interface CarouselCardProps {
  currentItem: CarouselData;
}
const Carousel = ({
  data,
  cardsToShow = 1,
  autoScrollInterval = 3000,
}: CarouselProps) => {
  const {
    containerRef,
    scrollPosition,
    scrollToNext,
    scrollToPrevious,
    handleTouchStart,
    handleTouchMove,
  } = useScrollCarousel(cardsToShow);

  const [autoScroll, setAutoScroll] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (!autoScrollInterval) return;
    const interval = setInterval(() => {
      if (autoScroll) scrollToNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [scrollToNext, autoScrollInterval, autoScroll]);

  // Set the card width dynamically based on the number of cards to show
  const cardWidth = 100 / cardsToShow;

  return (
    <section
      className="relative py-8 px-4 md:px-8 flex justify-center" // Add px-4 for mobile view and center alignment
      aria-labelledby="carousel-title"
      onMouseEnter={() => setAutoScroll(false)}
      onMouseLeave={() => setAutoScroll(true)}
    >
      <h2 id="carousel-title" className="sr-only">
        Featured Services Carousel
      </h2>

      {/* Previous button */}
      <button
        aria-label="Scroll to previous item"
        className={`hidden md:block cursor-pointer absolute -left-10 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
          scrollPosition === "start" ? "opacity-50" : "opacity-100"
        }`}
        onClick={scrollToPrevious}
        disabled={scrollPosition === "start"}
      >
        <GrPrevious
          className="bg-gray-400 bg-opacity-50 p-2 rounded-full shadow-md h-12 w-12"
          aria-hidden="true"
        />
      </button>

      {/* Carousel container */}
      <div className="overflow-hidden">
        <ul
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar items-center justify-center gap-2 w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          role="region"
          aria-label="Carousel of services"
        >
          {data.map((item) => (
            <li
              key={item.id}
              role="group"
              aria-labelledby={`carousel-item-${item.id}-name`}
              className="flex-grow-0 flex-shrink-0 w-full sm:w-[100%] md:w-[33%] flex justify-center"
            >
              <CarouselCard currentItem={item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Next button */}
      <button
        aria-label="Scroll to next item"
        className={`hidden md:block cursor-pointer absolute -right-10 top-1/2 transform -translate-y-1/2 transition-opacity duration-300 ${
          scrollPosition === "end" ? "opacity-50" : "opacity-100"
        }`}
        onClick={scrollToNext}
        disabled={scrollPosition === "end"}
      >
        <GrNext
          className="bg-gray-400 bg-opacity-50 p-2 rounded-full shadow-md h-12 w-12"
          aria-hidden="true"
        />
      </button>
    </section>
  );
};

export default Carousel;

export const CarouselCard = ({ currentItem }: CarouselCardProps) => {
  const { fins_servicesImage, name, c_serviceDescription, slug } = currentItem;

  return (
    <article
      className="bg-white border flex flex-col pb-6 w-full h-[450px] md:h-[490px] mx-auto" // Center card horizontally using mx-auto
      aria-labelledby={`carousel-item-${currentItem.id}-name`}
      aria-describedby={`carousel-item-${currentItem.id}-description`}
    >
      {/* Service image */}
      <div className="flex justify-center">
        <Image
          loading="lazy"
          image={fins_servicesImage}
          className="!h-[250px] object-cover w-full"
        />
      </div>

      {/* Service name */}
      <h3
        id={`carousel-item-${currentItem.id}-name`}
        className="px-4 text-center font-semibold line-clamp-2 mt-4" // Center the text
        style={{ minHeight: "4rem", maxHeight: "6rem" }}
      >
        {name}
      </h3>

      {/* Service description */}
      <p
        id={`carousel-item-${currentItem.id}-description`}
        className="px-4 text-center line-clamp-3 mt-2" // Center the description
        style={{ minHeight: "3rem", maxHeight: "9rem" }}
      >
        {c_serviceDescription}
      </p>

      {/* Call to action */}
      <Cta
        buttonText={`More about ${name}`}
        url={slug}
        style="primary"
        classNames="mt-4 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md mx-auto" // Center the CTA button
      />
    </article>
  );
};
