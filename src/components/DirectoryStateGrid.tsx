import { DirectoryChild } from "../types/DirectoryChild";
import { DirectoryParent } from "../types/DirectoryParent";

interface DirectoryGridProps {
  name?: string;
  description?: string;
  directoryParents?: DirectoryParent[];
  directoryChildren?: DirectoryChild[];
  relativePrefixToRoot?: string;
}

const sortByName = (
  a: DirectoryParent | DirectoryChild,
  b: DirectoryParent | DirectoryChild
) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const DirectoryStateGrid = ({
  name,
  description,
  directoryChildren,
  relativePrefixToRoot,
}: DirectoryGridProps) => {
  let sortedChildren;
  let childrenDivs;
  if (directoryChildren) {
    sortedChildren = directoryChildren?.sort(sortByName) || [];
    childrenDivs = sortedChildren.map((child: DirectoryChild) => (
      <article key={child.slug}>
        <a
          key="uRL"
          href={relativePrefixToRoot + child.slug}
          className="font-bold text-lg md:text-xl hover:underline"
        >
          {child.name} ({child.dm_childEntityIds?.length || 0})
        </a>
      </article>
    ));
  }
  return (
    <>
      <article className="section space-y-8 md:space-y-14 px-5 md:px-10 ">
        <section className="space-y-6">
          {name && (
            <h2>
              {name} ({directoryChildren?.length})
            </h2>
          )}
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

export default DirectoryStateGrid;
