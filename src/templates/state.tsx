import * as React from "react";
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
import { isProduction } from "@yext/pages/util";
import "../index.css";
import PageLayout from "../components/page-layout";
import DirectoryHero from "../components/DirectoryHero";
import DirectoryStateGrid from "../components/DirectoryStateGrid";

export const config: TemplateConfig = {
  stream: {
    $id: "state-stream",
    filter: {
      entityTypes: ["ce_state"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "mainPhone",
      "c_addressRegionDisplayName",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.dm_childEntityIds",
      "dm_childEntityIds",
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

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    siteDomain,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  return (
    <>
      <PageLayout _site={document._site}>
        <DirectoryHero
          pageTitle={`Capital Bank in ${c_addressRegionDisplayName}`}
        />
        <article className="centered-container">
          <section className="mx-auto max-w-7xl flex flex-row font-bold p-6 lg:px-8">
            <h1 className="sr-only">Directory States Home</h1>
            <a
              href={"/root.html"}
              className="text-brand-primary hover:text-brand-hover"
            >
              Home
            </a>
            <span className="mx-2 text-gray-400">&gt;</span>
            <a href={"#"} className="text-brand-primary hover:text-brand-hover">
              {name}
            </a>
          </section>
          <DirectoryStateGrid
            name={
              c_addressRegionDisplayName ? c_addressRegionDisplayName : name
            }
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </article>
      </PageLayout>
      {/* This component displays a link to the entity that represents the given page in the Knowledge Graph*/}
      {/* {!isProduction(siteDomain) && <EditTool data={document} />} */}
    </>
  );
};

export default State;
