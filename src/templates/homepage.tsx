/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Cta from "../components/cta";
import GetInTouchBanner from "../components/getInTouchBanner";
import NearByLocations from "../components/nearByLocations";
import OurInsights from "../components/ourInsights";
import PageLayout from "../components/page-layout";
import RelatedFaqs from "../components/relatedFaqs";
import "../index.css";

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_featuredServices.id",
      "c_featuredServices.name",
      "c_featuredServices.slug",
      "c_featuredServices.c_serviceDescription",
      "c_featuredServices.fins_servicesImage",
      "c_featuredEvents.id",
      "c_featuredEvents.name",
      "c_featuredEvents.slug",
      "c_featuredEvents.c_eventPhoto",
      "c_taxonomyStructure.name",
      "c_taxonomyStructure.slug",
      "c_heroBanners.name",
      "c_heroBanners.description",
      "c_heroBanners.cTA",
      "c_heroBanners.backgroundImage",
      "c_featuredArticles.id",
      "c_featuredArticles.name",
      "c_featuredArticles.slug",
      "c_featuredArticles.c_insightsArticleSummary",
      "c_featuredArticles.datePosted",
      "c_featuredArticles.primaryPhoto",
      "c_featuredFAQs.question",
      "c_featuredFAQs.answerV2",
    ],
    filter: {
      entityIds: ["388996653992360418"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Capital Fins Bank | Homepage",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const Homepage: Template<TemplateRenderProps> = ({ document }) => {
  const {
    c_featuredServices,
    c_heroBanners,
    c_featuredArticles,
    c_featuredFAQs,
  } = document;
  return (
    <>
      <PageLayout _site={document._site}>
        <Hero c_heroBanners={c_heroBanners} />
        <section className="w-full flex justify-center items-center h-16 md:h-24 text-center mx-auto bg-white">
          <h2 className="sr-only">Learn more section</h2>
          <Cta
            buttonText={"Learn more"}
            url={"/search.html"}
            style="primary"
            classNames="px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base rounded-md "
          ></Cta>
        </section>
        <section className="bg-primary-bg px-8  py-2 md:px-32  md:py-8 flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl md:text-[34px] font-medium text-center ">
            Our Services
          </h2>
          <Slider
            sliderData={c_featuredServices}
            duration={1000}
            animation={"horizontal flip"}
            showNextPrev={true}
            showIndicators={true}
          ></Slider>
        </section>

        {/* <GetInTouchBanner /> */}
        <section className="bg-primary-bg  px-8  py-2 md:px-32  md:py-8 flex flex-col gap-4 md:gap-8 centered-container">
          <h2 className="text-2xl md:text-[34px] font-medium text-center ">
            Insights
          </h2>
          <OurInsights linkedArticles={c_featuredArticles} />
        </section>
        <section className="bg-white px-8  py-2 md:px-32  md:py-8 ">
          <section className="centered-container flex flex-col gap-4 md:gap-8">
            <h2 className="text-2xl md:text-[34px] ont-medium text-center">
              Near by Locations
            </h2>
            <NearByLocations />
          </section>
        </section>
        <section className="px-8  py-2 md:px-32  md:py-8 bg-primary-bg centered-container flex flex-col gap-4   md:gap-8">
          <h2 className="text-2xl md:text-[34px] font-medium text-center">
            Featured FAQs
          </h2>
          <RelatedFaqs faqs={c_featuredFAQs} />
        </section>
      </PageLayout>
    </>
  );
};

export default Homepage;
