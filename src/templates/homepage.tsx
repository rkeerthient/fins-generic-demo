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
import ResponsiveSlider from "../components/ResponsiveSlider";
import Cta from "../components/cta";
import PageLayout from "../components/page-layout";
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
      "c_featuredArticles.primaryPhoto",
    ],
    filter: {
      entityTypes: ["ce_site"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Cook Children's | Search",
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

const Search: Template<TemplateRenderProps> = ({ document }) => {
  const {
    id,
    uid,
    meta,
    name,
    slug,
    c_featuredServices,
    c_featuredEvents,
    c_taxonomyStructure,
    c_heroBanners,
    c_featuredArticles,
  } = document;

  return (
    <>
      <PageLayout _site={document._site}>
        <Hero c_heroBanners={c_heroBanners} />
        <div className="w-full flex justify-center items-center h-16 md:h-24 text-center mx-auto bg-white">
          <Cta
            buttonText={"Learn more"}
            url={""}
            style="primary"
            classNames="px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base rounded-md "
          ></Cta>
        </div>
        <ResponsiveSlider data={c_featuredServices} />
      </PageLayout>
    </>
  );
};

export default Search;
