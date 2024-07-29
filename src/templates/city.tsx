/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import DirectoryHero from "../components/DirectoryHero";
import PageLayout from "../components/page-layout";
import "../index.css";

export const config: TemplateConfig = {
  stream: {
    $id: "city-stream",
    filter: {
      entityTypes: ["ce_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "mainPhone",
      "hours",
      "timezone",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.timezone",
    ],
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents, name } = data.document;

  (dm_directoryParents || []).push({ name: name, slug: "" });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: dm_directoryParents,
    },
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    siteDomain,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  return (
    <>
      <PageLayout _site={document._site}>
        <DirectoryHero
          pageTitle={`Capital Bank in ${name}, ${dm_directoryParents[1].name}`}
        />
        <article className="centered-container">
          <section className="mx-auto max-w-7xl flex flex-row font-bold p-6 lg:px-8">
            <h1 className="sr-only">Directory Cities Home</h1>
            <a
              href={"/root.html"}
              className="text-brand-primary hover:text-brand-hover"
            >
              Home
            </a>
            <span className="mx-2 text-gray-400">&gt;</span>
            <a
              href={`/${dm_directoryParents[1].slug}`}
              className="text-brand-primary hover:text-brand-hover"
            >
              {dm_directoryParents[1].name}
            </a>
            <span className="mx-2 text-gray-400">&gt;</span>
            <a href={"#"} className="text-brand-primary hover:text-brand-hover">
              {name}
            </a>
          </section>
          <DirectoryCityGrid
            name={`${name}, ${dm_directoryParents[1].name}`}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </article>
      </PageLayout>
      {/* {!isProduction(siteDomain) && <EditTool data={document} />} */}
    </>
  );
};

export default City;
