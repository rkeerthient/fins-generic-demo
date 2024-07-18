import { Card, Transition, Button, Label } from "semantic-ui-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cta from "../components/cta";
import { Image } from "@yext/pages-components";
interface ElementDefinition {
  render: () => JSX.Element;
}

type SemanticCarouselProps = {
  sliderData: string[];
  duration: number;
  animation: string;
  showNextPrev: boolean;
  showIndicators: boolean;
  onSlideChange?: (index: number, element: ElementDefinition) => void;
};

const Carousel = ({
  sliderData,
  duration = 3000,
  animation = "slide left",
  showNextPrev = false,
  showIndicators = false,
  onSlideChange,
}: SemanticCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elements, setElements] = useState<ElementDefinition[]>([]);

  useLayoutEffect(() => {
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

  // Effect to trigger slide change callback
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
      <article className="bg-white border [&:not(:first-child)]:ml-8 flex flex-col gap-4 pb-6   w-[490px]">
        <Image image={fins_servicesImage} className="!h-[250px]"></Image>
        <h3 className="px-4 text-xl font-bold ">{name}</h3>
        <p className=" px-4">{c_serviceDescription}</p>
        <Cta
          buttonText={"Learn more"}
          url={slug}
          style="primary"
          classNames="px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base rounded-md ml-4"
        ></Cta>
      </article>
    );
  };

  if (elements.length === 0) {
    return null;
  }

  return (
    <Card
      fluid
      className="carousel-container h-[600px] bg-red-800"
      border={false}
    >
      <Card.Content className="carousel flex">
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
        <div className="carousel-indicators">
          {showIndicators &&
            elements.map((element, index) => (
              <a key={index}>
                <Label
                  onClick={() => goToSlide(index)}
                  circular
                  color={currentIndex === index ? "black" : "grey"}
                  empty
                />
              </a>
            ))}
        </div>
        {showNextPrev && (
          <Button className="prev" onClick={prevClicked} icon="caret left" />
        )}
        {showNextPrev && (
          <Button className="next" onClick={nextClicked} icon="caret right" />
        )}
      </Card.Content>
    </Card>
  );
};

export default Carousel;
