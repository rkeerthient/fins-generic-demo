import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";
import DirectoryHero from "../components/DirectoryHero";
import PageLayout from "../components/page-layout";
import GuidedSearch from "../components/GuidedSearch";

export const getPath: GetPath<TemplateProps> = () => {
  return `guided-advisor-finder`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Guided Advisor Finder",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const GuidedDoctorFinder: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <PageLayout _site={document._site}>
      <DirectoryHero
        pageTitle={"Find an Advisor"}
        description={
          "Unlock Your Financial Potential with Expert Guidance. Find the Perfect Financial Advisor to Secure Your Future."
        }
      />
      <GuidedSearch />
    </PageLayout>
  );
};

export default GuidedDoctorFinder;
