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
      <div className="bg-white">
        <InsightsAndServicesHeroBanner document={document} isInsights={true} />
        <article className="max-w-4xl mx-auto pt-24 prose ">
          <Markdown>{document.c_insightsArticleBody.markdown}</Markdown>
        </article>
      </div>
    </PageLayout>
  );
};

export default Insights;
