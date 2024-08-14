import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import InpageNav from "../components/InpageNav";
import Details from "../components/details";
import LetsTalk from "../components/letsTalk";
import OurInsights from "../components/ourInsights";
import PageLayout from "../components/page-layout";
import "../index.css";

export const config: TemplateConfig = {
  stream: {
    $id: "professionals",
    localization: { locales: ["en"] },
    filter: {
      entityTypes: ["financialProfessional"],
      savedFilterIds: ["1339778047"],
    },
    fields: [
      "name",
      "id",
      "description",
      "headshot",
      "slug",
      "photoGallery",
      "c_fPBio",
      "fins_jobTitle",
      "logo",
      "fins_relatedServices.name",
      "emails",
      "address",
      "mainPhone",
      "geocodedCoordinate",
      "fins_relatedServices.description",
      "fins_relatedServices.fins_servicesImage",
      "c_linkedInsightsArticles.name",
      "c_linkedInsightsArticles.slug",
      "c_linkedInsightsArticles.c_insightsArticleSummary",
      "c_linkedInsightsArticles.primaryPhoto",
      "c_linkedInsightsArticles.datePosted",
      "yearsOfExperience",
      "languages",
      "certifications",
      "interests",
      "hobbies",
      "yextDisplayCoordinate",
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
    title: `${document.name} | Professional`,
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
const Professionals = ({ document }: TemplateProps) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);

  const { name } = document;
  const InPageNavItems = [
    {
      name: "About",
      navId: "about",
    },
    {
      name: "Details",
      navId: "details",
    },
    {
      name: "Insights",
      navId: "insights",
    },
    {
      name: "Let's Talk",
      navId: "letstalk",
    },
  ];
  return (
    <PageLayout _site={document._site}>
      <HeroBanner document={document} isProfessional={true} />
      <InpageNav navItems={InPageNavItems}></InpageNav>

      <section className="centered-container px-8 py-4 md:px-32 md:py-8 flex flex-col gap-4 md:gap-8">
        <h2 className="sr-only">About me</h2>
        <a className="hidden" id="about"></a>
        <h2 className="text-center">About {name}</h2>
        <p>{document.c_fPBio}</p>
      </section>
      <section className="bg-white ">
        <h2 className="sr-only">My Details</h2>
        <section className="centered-container  px-8 py-4 md:px-32 md:py-8 flex flex-col gap-4 md:gap-8">
          <a className="hidden" id="details"></a>
          <h2 className="text-center">My Details</h2>
          <Details document={document} />
        </section>
      </section>
      <section className=" centered-container">
        <h2 className="sr-only">Insights</h2>
        <a className="hidden" id="insights"></a>
        <h2 className="text-center">Insights</h2>
        <OurInsights linkedArticles={document.c_linkedInsightsArticles} />
      </section>
      <section className="bg-white">
        <h2 className="sr-only">Lets talk</h2>
        <a className="hidden" id="letstalk"></a>
        <section className="px-8 py-4 md:px-32 md:py-8 flex flex-col gap-4 md:gap-8">
          <h2 className="text-center">Lets Talk</h2>
          <LetsTalk
            description={document.description}
            phone={document.mainPhone}
            emails={document.emails}
            geoCodedCoordinate={document.geocodedCoordinate}
          />
        </section>
      </section>
    </PageLayout>
  );
};

export default Professionals;
