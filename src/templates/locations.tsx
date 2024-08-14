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
import LetsTalk from "../components/letsTalk";
import OurInsights from "../components/ourInsights";
import PageLayout from "../components/page-layout";
import "../index.css";
import { OurTeam } from "../components/ourTeam";

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
      "c_relatedFPsAndTeams.hours",
      "c_relatedFPsAndTeams.timezone",
      "c_relatedFPsAndTeams.id",
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
    title: `${document.name} | Location`,
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
      name: "About me",
      navId: "aboutMe",
    },
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

      <InpageNav navItems={InPageNavItems}></InpageNav>
      <article className="centered-container flex md:flex-row flex-col justify-center items-center py-16 gap-8 px-4 md:px-0">
        <img
          src={
            "https://a.mktgcdn.com/p/65JQqTuL6mWfKaHM0EiyiPEV820Oi35tUPhDN36Tq1A/3149x4724.jpg"
          }
          className="w-full md:w-[200.59px] aspect-[3/4] rounded-lg object-center object-cover"
        />
        <section className="flex flex-col items-left gap-6">
          <a className="hidden" id="aboutMe"></a>
          <h2>Joseph Adams</h2>
          <p className="  text-base font-bold">Regional Director</p>
          <p className=" text-base font-normal underline">
            jadams@capitalbank.com
          </p>
          <p className="  text-base font-normal">
            {document.description.length <= 60
              ? `Welcome to Capital Bank, where your financial goals become our mission. At Capital Bank, we offer a comprehensive range of services to meet your banking needs. From retail banking solutions designed for your everyday transactions to mortgage and lending services to help you achieve your dream home, we've got you covered. Our dedicated team of experts specializes in wealth management, ensuring your financial future is secure and prosperous. For businesses, our business banking services provide tailored solutions to fuel your growth and success. At Capital Bank, we are committed to delivering excellence in banking, putting you on the path to financial success.`
              : document.description}
          </p>
        </section>
      </article>

      <section className="bg-white  ">
        <a className="hidden" id="insights"></a>
        <section className="centered-container px-8 py-4 md:px-32 md:py-8 flex flex-col gap-4 md:gap-8 centered-container">
          <h2 className="text-center">Our Insights</h2>
          <OurInsights linkedArticles={document.c_linkedInsightsArticles} />
        </section>
      </section>
      <section className=" px-8  py-2 md:px-32  md:py-8 ">
        <a className="hidden" id="team"></a>
        <section className="centered-container flex flex-col gap-4 md:gap-8">
          <h2 className="text-center">Our {document.address.city} Team</h2>
          {document.c_relatedFPsAndTeams && (
            <OurTeam teamMembers={document.c_relatedFPsAndTeams} />
          )}
        </section>
      </section>
      <section className="bg-white px-8  py-2 md:px-32  md:py-8 ">
        <a className="hidden" id="insights"></a>
        <section className="centered-container flex flex-col gap-4 md:gap-8">
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

export default Locations;
