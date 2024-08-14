import { useState, useEffect, useRef } from "react";
import { Image } from "@yext/pages-components";
import { Transition } from "semantic-ui-react";
import Cta from "./cta";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ElementDefinition {
  render: () => JSX.Element;
}

type SliderProps = {
  sliderData: string[];
  duration: number;
  animation: string;
  showNextPrev: boolean;
  showIndicators: boolean;
  onSlideChange?: (index: number, element: ElementDefinition) => void;
};

const Slider = ({
  sliderData,
  duration = 3000,
  animation = "slide left",
  showNextPrev = false,
  showIndicators = false,
  onSlideChange,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elements, setElements] = useState<ElementDefinition[]>([]);

  useEffect(() => {
    const newElements: ElementDefinition[] = sliderData.map((item) => ({
      render: () => buildCard(item),
    }));
    setElements(newElements);
  }, [sliderData]);

  useEffect(() => {
    if (duration) {
      interval.current = setInterval(nextSlide, duration);
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [duration, elements.length]);

  useEffect(() => {
    slideChange();
  }, [currentIndex]);

  const slideChange = () => {
    try {
      onSlideChange?.(currentIndex, elements[currentIndex]);
    } catch (e) {
      console.error("Error during slide change:", e);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % elements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? elements.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setCurrentIndex(index);
  };

  const nextClicked = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    nextSlide();
  };

  const prevClicked = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    prevSlide();
  };

  const buildCard = (data: any) => {
    const { fins_servicesImage, name, id, slug, c_serviceDescription } = data;
    return (
      <article className="bg-white border [&:not(:first-child)]:ml-8 flex flex-col pb-6 w-full md:w-1/3">
        <Image image={fins_servicesImage} className="!h-[250px]"></Image>
        <h3 className="px-4">{name}</h3>
        <p className=" px-4">{c_serviceDescription}</p>
        <Cta
          buttonText={"Learn more"}
          url={slug}
          style="primary"
          classNames="mt-4 px-2 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md ml-4"
        ></Cta>
      </article>
    );
  };

  if (elements.length === 0) {
    return null;
  }
  return (
    <section
      aria-labelledby="services-heading"
      className={`overflow-hidden relative max-w-screen-xl  mx-auto`}
    >
      <h1 id="services-heading" className="sr-only">
        Our Services
      </h1>
      <div className="hidden md:flex">
        {[
          currentIndex,
          (currentIndex + 1) % elements.length,
          (currentIndex + 2) % elements.length,
        ].map((index) => (
          <Transition
            key={index}
            transitionOnMount={true}
            visible={true}
            duration={1000}
            animation={animation}
          >
            {elements[index]?.render()}
          </Transition>
        ))}
        {showIndicators &&
          elements.map((element, index) => (
            <a key={index}>
              <span
                onClick={() => goToSlide(index)}
                color={currentIndex === index ? "black" : "grey"}
              />
            </a>
          ))}
        {/* {showNextPrev && (
          <ChevronRightIcon className="h-4 w-4" onClick={prevClicked} />
        )}
        {showNextPrev && (
          <ChevronLeftIcon className="h-4 w-4" onClick={nextClicked} />
        )} */}
      </div>
      <div className="flex md:hidden">
        {[currentIndex].map((index) => (
          <Transition
            key={index}
            transitionOnMount={true}
            visible={true}
            duration={1000}
            animation={animation}
          >
            {elements[index]?.render()}
          </Transition>
        ))}
        <div className="carousel-indicators">
          {showIndicators &&
            elements.map((element, index) => (
              <a key={index}>
                <span
                  onClick={() => goToSlide(index)}
                  color={currentIndex === index ? "black" : "grey"}
                />
              </a>
            ))}
        </div>
        {/* {showNextPrev && (
          <ChevronRightIcon className="h-4 w-4" onClick={prevClicked} />
        )}
        {showNextPrev && (
          <ChevronLeftIcon className="h-4 w-4" onClick={nextClicked} />
        )} */}
      </div>
    </section>
  );
};

export default Slider;
