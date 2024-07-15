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
import OurTeam from "../components/ourTeam";

export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    localization: { locales: ["en"] },
    filter: {
      entityTypes: ["location"],
    },
    fields: [
      "name",
      "id",
      "description",
      "slug",
      "photoGallery",
      "logo",
      "emails",
      "address",
      "mainPhone",
      "geocodedCoordinate",
      "fins_relatedServices.name",
      "fins_relatedServices.c_serviceDescription",
      "fins_relatedServices.slug",
      "c_relatedFPsAndTeams.name",
      "c_relatedFPsAndTeams.c_individualOrTeam",
      "c_relatedFPsAndTeams.mainPhone",
      "c_relatedFPsAndTeams.emails",
      "c_relatedFPsAndTeams.headshot",
      "c_relatedFPsAndTeams.fins_jobTitle",
      "c_relatedFPsAndTeams.slug",
      "c_linkedInsightsArticles.name",
      "c_linkedInsightsArticles.slug",
      "c_linkedInsightsArticles.c_insightsArticleSummary",
      "c_linkedInsightsArticles.primaryPhoto",
      "c_linkedInsightsArticles.datePosted",
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
const Locations = ({ document, __meta }: TemplateProps) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);

  const InPageNavItems = [
    {
      name: "Services",
      navId: "services",
    },
    {
      name: `Our ${document.address.city} Team`,
      navId: "team",
    },
    {
      name: "Insights",
      navId: "insights",
    },
    {
      name: "Recent Reviews",
      navId: "reviews",
    },
    {
      name: "Let's Talk",
      navId: "letstalk",
    },
  ];
  return (
    <PageLayout _site={document._site}>
      <HeroBanner document={document} isProfessional={false} />
      <article className="centered-container flex md:flex-row flex-col justify-center items-center py-16 gap-8 px-4 md:px-0">
        <img
          src={
            "https://a.mktgcdn.com/p/65JQqTuL6mWfKaHM0EiyiPEV820Oi35tUPhDN36Tq1A/3149x4724.jpg"
          }
          className="w-full md:w-[200.59px] aspect-[3/4] rounded-lg object-center object-cover"
        />
        <section className="flex flex-col items-left gap-6">
          <h2 className="text-2xl font-bold text-blue-950">Joseph Adams</h2>
          <p className="text-blue-950 text-base font-bold">Regional Director</p>
          <p className="text-zinc-800 text-base font-normal underline">
            jadams@capitalbank.com
          </p>
          <p className="text-zinc-800 text-base font-normal">
            {document.description}
          </p>
        </section>
      </article>
      <InpageNav navItems={InPageNavItems}></InpageNav>
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
      <section className="centered-container py-10 space-y-8">
        <a id="team"></a>
        <h2 className="text-4xl font-medium text-center">
          Our {document.address.city} Team
        </h2>
        {document.c_relatedFPsAndTeams && (
          <OurTeam teamMembers={document.c_relatedFPsAndTeams} />
        )}
      </section>
    </PageLayout>
  );
};

export default Locations;
