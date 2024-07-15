import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";
import { useState } from "react";
import PageLayout from "../components/page-layout";
import InpageNav from "../components/InpageNav";
import { Image } from "@yext/pages-components";
import HeroBanner from "../components/HeroBanner";
import Hero from "../components/Hero";
import Details from "../components/details";
import OurInsights from "../components/ourInsights";
import LetsTalk from "../components/letsTalk";

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
const Professionals = ({ document, __meta }: TemplateProps) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);
  console.log(JSON.stringify(document.geocodedCoordinate));

  const { _site, mainPhone, name } = document;
  const mappinSVG = (
    <svg
      width="56"
      height="58"
      viewBox="0 0 56 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z"
        fill="#0F70F0"
        stroke="black"
        strokeOpacity="0.5"
      />
      <path
        d="M28.095 27.2577C32.5571 27.2577 36.1743 23.6405 36.1743 19.1784C36.1743 14.7163 32.5571 11.0991 28.095 11.0991C23.633 11.0991 20.0157 14.7163 20.0157 19.1784C20.0157 23.6405 23.633 27.2577 28.095 27.2577Z"
        fill="white"
      />
    </svg>
  );
  const formattedPhone = `${document.mainPhone.substring(
    0,
    2
  )} (${document.mainPhone.substring(2, 5)}) ${document.mainPhone.substring(
    5,
    8
  )}-${document.mainPhone.substring(8)}`;
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

      <section className="centered-container py-10 space-y-8">
        <a id="about"></a>
        <h2 className="text-4xl font-medium text-center">About {name}</h2>
        <p>{document.c_fPBio}</p>
      </section>
      <section className="white-centered-container py-10 space-y-8  ">
        <a id="details"></a>
        <h2 className="text-4xl font-medium text-center">My Details</h2>
        <Details document={document} />
        {/* <Articles articles={document.c_linkedInsightsArticles} /> */}
      </section>
      <section className="centered-container py-10 space-y-8">
        <a id="insights"></a>
        <h2 className="text-4xl font-medium text-center">Insights</h2>
        <OurInsights linkedArticles={document.c_linkedInsightsArticles} />
      </section>
      <section className="centered-container py-10 space-y-8">
        <a id="letstalk"></a>
        <h2 className="text-4xl font-medium text-center">Lets Talk</h2>
        <LetsTalk
          description={document.description}
          phone={document.mainPhone}
          emails={document.emails}
          geoCodedCoordinate={document.geocodedCoordinate}
        />
      </section>
    </PageLayout>
  );
};

export default Professionals;
