import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import InsightsAndServicesHeroBanner from "../components/InsightsAndServicesHeroBanner";
import PageLayout from "../components/page-layout";
import "../index.css";
import Markdown from "react-markdown";

export const config: TemplateConfig = {
  stream: {
    $id: "insightsarticles",
    localization: { locales: ["en"] },
    filter: {
      entityTypes: ["ce_insightsArticle"],
    },
    fields: [
      "name",
      "id",
      "slug",
      "datePosted",
      "c_insightsArticleSummary",
      "primaryPhoto",
      "c_insightsArticleBody",
      "fins_servicesImage",
    ],
  },
};
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ?? document.id.toString();
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${document.name} | Insights`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Capital Wealth Management Professional",
        },
      },
    ],
  };
};
const Insights = ({ document }: TemplateProps) => {
  return (
    <PageLayout _site={document._site}>
      <section className="w-full flex flex-col justify-center items-center text-center mx-auto  px-4  py-2 md:px-32  md:py-8 ">
        <h2 className="sr-only">{document.name} Page</h2>
        <InsightsAndServicesHeroBanner document={document} isInsights={true} />
      </section>
      <section className="bg-white flex flex-col justify-center items-center text-center mx-auto  ">
        <h2 className="sr-only">Article body</h2>
        <article className=" centered-container  px-4  py-2 md:px-32  md:py-8 prose ">
          <Markdown className="text-left">
            {document.c_insightsArticleBody.markdown}
          </Markdown>
        </article>
      </section>
    </PageLayout>
  );
};

export default Insights;
