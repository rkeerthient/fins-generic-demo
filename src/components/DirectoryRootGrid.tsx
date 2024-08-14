import { DirectoryChild } from "../types/DirectoryChild";
import { DirectoryParent } from "../types/DirectoryParent";

interface DirectoryRootProps {
  name?: string;
  description?: string;
  directoryChildren?: any;
  relativePrefixToRoot?: string;
}

const sortChildrenByName = (
  a: DirectoryChild | DirectoryParent,
  b: DirectoryChild | DirectoryParent
) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const DirectoryRootGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryRootProps) => {
  const sortedChildren = directoryChildren?.sort(sortChildrenByName) || [];
  const childrenDivs = sortedChildren.map((child: DirectoryChild) => (
    <article key={child.slug}>
      <a
        href={relativePrefixToRoot + child.slug}
        className="font-bold text-lg md:text-xl hover:underline"
      >
        {child.c_addressRegionDisplayName
          ? child.c_addressRegionDisplayName
          : child.name}
        ({child.dm_childEntityIds?.length || 0})
      </a>
    </article>
  ));
  return (
    <>
      <article className="section space-y-8 md:space-y-14 px-5 md:px-10 ">
        <section className="space-y-6">
          {name && <h1>{name}</h1>}
          {description && <p className="text-2xl text-center">{description}</p>}
        </section>
        {directoryChildren && (
          <article className="grid gap-4 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {childrenDivs}
          </article>
        )}
      </article>
    </>
  );
};

export default DirectoryRootGrid;
