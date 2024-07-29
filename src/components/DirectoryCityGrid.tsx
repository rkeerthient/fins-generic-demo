import { Address } from "@yext/pages-components";
import * as React from "react";
import { DirectoryChild } from "../types/DirectoryChild";
import { DirectoryParent } from "../types/DirectoryParent";
import { FormatAddress, FormatPhoneNumber } from "../common/util";
import LocationCard, { getDirectionsUrl } from "./cards/LocationCard";
import HoursText from "./HoursText";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Cta from "./cta";

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
    const sortedChildren = directoryChildren?.sort(sortByCity) || [];
    childrenDivs = sortedChildren.map((child: any, index: number) => {
      const { id, name, distance, timezone, hours, address, slug, mainPhone } =
        child;
      return (
        <article key={id} className="border rounded-lg" id={id}>
          <section className="relative flex flex-col  bg-white  p-4">
            <section className="px-2 flex flex-col gap-3 w-full">
              <h2 className="flex items-center ">
                <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
                  {index! + 1}
                </span>
                {name}
              </h2>
              <p className="!text-sm">
                {hours ? (
                  <HoursText timezone={timezone} hours={hours} />
                ) : (
                  <p>Fill in your hours</p>
                )}
              </p>
              <section className="text-[#333333] flex flex-col justify-start leading-loose text-sm  ">
                <FormatAddress address={address} isDirectory={true} />
                <p className="flex flex-col ">
                  <FormatPhoneNumber mainPhone={mainPhone} />

                  <p className="flex items-center text-[#333333]">
                    <EnvelopeIcon className="h-4 w-4 text-primary" />
                    <span className="ml-2">capital-nyc@capital.com</span>
                  </p>
                </p>
              </section>
              <section className=" flex gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
                <Cta
                  buttonText="Get In Touch"
                  style="primary"
                  url={getDirectionsUrl(address)}
                  classNames=" md:px-4  py-1 px-2  md:text-sm rounded-md"
                />

                <Cta
                  buttonText={"View Page"}
                  style="secondary"
                  url={`/${slug}`}
                  classNames=" md:px-4  px-2 py-1  md:text-sm rounded-md"
                />
              </section>
            </section>
          </section>
        </article>
      );
    });
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
          <article className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3  ƒ">
            {childrenDivs}
          </article>
        )}
      </article>
    </>
  );
};

export default DirectoryCityGrid;
