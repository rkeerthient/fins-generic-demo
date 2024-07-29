import { Address } from "@yext/pages-components";
import * as React from "react";
import { DirectoryChild } from "../types/DirectoryChild";
import { DirectoryParent } from "../types/DirectoryParent";
import { FormatPhoneNumber } from "../common/util";

export interface DirectoryGridProps {
  name?: string;
  description?: string;
  directoryParents?: DirectoryParent[];
  directoryChildren?: DirectoryChild[];
  relativePrefixToRoot?: string;
}

const sortByCity = (a: DirectoryChild, b: DirectoryChild) => {
  const first = a.address.city;
  const second = b.address.city;
  return first! < second! ? -1 : first! > second! ? 1 : 0;
};

const DirectoryCityGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryGridProps) => {
  let childrenDivs;

  if (directoryChildren) {
    console.log(JSON.stringify(directoryChildren));

    const sortedChildren = directoryChildren?.sort(sortByCity) || [];
    childrenDivs = sortedChildren.map((child: any) => (
      <section
        key={child.slug}
        className="border rounded-lg drop-shadow-md bg-gray-100 space-y-6 p-3 h-60"
      >
        <h2>
          <a
            className="font-bold text-2xl text-blue-950 hover:underline"
            href={relativePrefixToRoot + child.slug}
          >
            {child.name}
          </a>
        </h2>
        <p className="m-1 border"></p>
        <Address address={child.address}></Address>
        <FormatPhoneNumber mainPhone={child.mainPhone} />
      </section>
    ));
  }
  return (
    <>
      <article className="section space-y-14 px-10">
        <section className="space-y-6">
          {name && (
            <h1 className="text-3xl font-semibold text-center">{name}</h1>
          )}
          {description && <p className="text-2xl text-center">{description}</p>}
        </section>
        {directoryChildren && (
          <article className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {childrenDivs}
          </article>
        )}
      </article>
    </>
  );
};

export default DirectoryCityGrid;
