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
import OurTeam from "../components/ourTeam";
import PageLayout from "../components/page-layout";
import Pagination from "../components/Pagination";
import "../index.css";

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
  const [visibleProfessionals, setVisibleProfessionals] = useState(0);
  const [loading, setLoading] = useState(true);

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
      <div className="bg-primary-bg">
        <InsightsAndServicesHeroBanner document={document} isInsights={false} />
        <article className="max-w-4xl mx-auto pt-24 prose ">
          <p>{document.c_serviceLongDescription}</p>
        </article>
      </div>
      {document.c_childProducts && (
        <section className=" centered-container mt-4">
          <h2 className="text-3xl flex justify-center mb-4 font-bold">
            Related Products
          </h2>
          <ChildProducts products={document.c_childProducts}></ChildProducts>
        </section>
      )}
      {document.c_primaryFPs && (
        <section className=" centered-container mt-4">
          <h2 className="text-3xl flex justify-center mb-4 font-bold">
            Related Professionals
          </h2>
          <OurTeam teamMembers={currentRecords} />

          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      )}
    </PageLayout>
  );
};

export default Services;
