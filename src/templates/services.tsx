import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { useState } from "react";
import ChildProducts from "../components/childProducts";
import InsightsAndServicesHeroBanner from "../components/InsightsAndServicesHeroBanner";
import PageLayout from "../components/page-layout";
import Pagination from "../components/Pagination";
import "../index.css";
import { OurTeam, OurTeamMobile } from "../components/ourTeam";

export const config: TemplateConfig = {
  stream: {
    $id: "services",
    localization: { locales: ["en"] },
    filter: {
      entityTypes: ["fins_service"],
    },
    fields: [
      "name",
      "id",
      "slug",
      "fins_servicesImage",
      "c_childProducts.name",
      "c_childProducts.c_serviceDescription",
      "c_childProducts.slug",
      "c_childProducts.id",
      "c_serviceDescription",
      "c_serviceLongDescription",
      "c_primaryFPs.name",
      "c_primaryFPs.timezone",
      "c_primaryFPs.hours",
      "c_primaryFPs.c_individualOrTeam",
      "c_primaryFPs.mainPhone",
      "c_primaryFPs.emails",
      "c_primaryFPs.headshot",
      "c_primaryFPs.fins_jobTitle",
      "c_primaryFPs.slug",
      "c_primaryFPs.id",
      "c_primaryFPs.address",
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
    title: `${document.name} | Services`,
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
const Services = ({ document }: TemplateProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;

  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords =
    document.c_primaryFPs &&
    document.c_primaryFPs.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages =
    document.c_primaryFPs &&
    Math.ceil(document.c_primaryFPs.length / recordsPerPage);

  return (
    <PageLayout _site={document._site}>
      <section className="w-full flex flex-col justify-center items-center text-center mx-auto bg-white  px-4  py-2 md:px-32  md:py-8 ">
        <h2 className="sr-only">{document.name} Page</h2>
        <InsightsAndServicesHeroBanner document={document} isInsights={false} />
      </section>
      <section className="bg-secondary flex flex-col justify-center items-center text-center mx-auto ">
        <h2 className="sr-only">Article body</h2>
        <article className=" centered-container md:py-8 py-4 ">
          <p className="text-left md:text-center">
            {document.c_serviceLongDescription}
          </p>
        </article>
      </section>
      {document.c_childProducts && (
        <section className="bg-white px-8 py-2 md:px-32  md:py-8 ">
          <h2 className="sr-only">Related products</h2>
          <section className="centered-container flex flex-col gap-4 md:gap-8">
            <h2 className="text-2xl md:text-[34px] font-medium text-center">
              Related Products
            </h2>
            <ChildProducts products={document.c_childProducts}></ChildProducts>
          </section>
        </section>
      )}

      {document.c_primaryFPs && (
        <section className="px-8  py-2 md:px-24 md:py-8 bg-secondary centered-container flex flex-col gap-4 md:gap-8">
          <h2 className="text-2xl md:text-[34px] font-medium text-center">
            Related Professionals
          </h2>
          <article className="md:hidden block">
            <OurTeamMobile teamMembers={currentRecords} name={document.name} />
          </article>
          <article className="hidden md:block">
            <OurTeam teamMembers={currentRecords} />{" "}
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </article>
        </section>
      )}
    </PageLayout>
  );
};

export default Services;
