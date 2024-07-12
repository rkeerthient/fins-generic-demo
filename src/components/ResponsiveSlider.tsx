import { default as Slider } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages-components";
import Cta from "./cta";
// @ts-ignore
const SliderComponent = !!Slider.default ? Slider.default : Slider;
export default function ResponsiveSlider({ data }: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mx-auto md:px-8 px-2 md:py-16 py-8 pt-10 ">
      <div className="mx-auto text-center">
        <h2 className="text-2xl md:text-3xl tracking-tight mb-6 md:mb-12">{`Our Services`}</h2>
      </div>
      <SliderComponent {...settings}>
        {data &&
          data.map((item: any, index: any) => {
            const { fins_servicesImage, name, id, slug, c_serviceDescription } =
              item;
            return (
              <section
                key={id}
                className="bg-white border [&:not(:first-child)]:ml-8 flex flex-col gap-4 pb-4"
              >
                <Image
                  image={fins_servicesImage}
                  className="!aspect-square"
                  layout="fixed"
                  height={275}
                ></Image>
                <h3 className="px-4 text-xl font-bold mt-2">{name}</h3>
                <p className=" px-4 mb-4 ">{c_serviceDescription}</p>
                <Cta
                  buttonText={"Learn more"}
                  url={slug}
                  style="primary"
                  classNames=" px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base rounded-md ml-4"
                ></Cta>
              </section>
            );
          })}
      </SliderComponent>
    </div>
  );
}
