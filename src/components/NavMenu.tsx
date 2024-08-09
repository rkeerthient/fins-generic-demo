import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const NavMenu = ({ menuItems, isPrimary = false }: any) => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [nestedData, setNestedData] = useState<any>(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (index: any) => {
    setHoveredMenu(index);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
    setNestedData(null);
  };

  const generateSubMenu = (item: any) => {
    console.log(JSON.stringify(item));

    return (
      <>
        {item.length >= 2 ? (
          <ul className="text-sm w-full  m-0 p-0  mt-4 bg-primary border  border-primary-bg">
            {item.map((subItem: any, subIndex: any) => {
              return (
                <li
                  onMouseEnter={() => setHoveredItem(subIndex)}
                  className={`border-l-4 border-transparent px-1  bg-primary   hover:border-white hover:border-l-4 w-[200px] ${hoveredItem === subIndex &&
                    `bg-[#E1E5E8] border-[#10172a] border-l-4 `
                    }`}
                  key={subIndex}
                >
                  <button
                    onMouseEnter={() => setNestedData(subItem)}
                    type="button"
                    className="border-none z-50 text-left bg-transparent leading-copy text-mid-gray px-4 py-2 relative sans-serif whistespace-break-spaces flex justify-between items-center w-full"
                  >
                    <a
                      href={`/${(subItem.slug && buildLink(subItem.slug)) || `#`
                        }`}
                    >
                      {subItem.name}
                    </a>
                    <ChevronRightIcon className="h-3 w-3 ml-1" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="text-sm w-full h-full m-0 p-0  mt-4 bg-primary border border-primary-bg">
            {item[0].c_childProducts.map((subItem: any, subIndex: any) => {
              return (
                <li
                  className="border-l-4 border-transparent px-1   hover:border-white hover:border-l-4 w-[200px]"
                  key={subIndex}
                >
                  <button
                    type="button"
                    className="border-none z-50 text-left bg-transparent leading-copy text-mid-gray px-4 py-2 relative sans-serif whitespace-break-spaces"
                  >
                    <a
                      href={`/${(subItem.slug && buildLink(subItem.slug)) || `#`
                        }`}
                    >
                      {subItem.name}
                    </a>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };

  return (
    <ul className="flex flex-row p-0 m-0 py-2">
      {menuItems.map((item: any, index: any) => (
        <li
          className="px-1 hover:underline hover:underline-offset-4"
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <section className={`relative z-50 ${!isPrimary && `text-sm`}`}
          >

            <a
              className=" flex items-center no-underline desktop-header-trigger leading-title font-bold text-navy secondary-nav-flyout-trigger px-1 rounded-full transition-all duration-100 ease-in-out"
              href={`/${item.slug || `#`}`}
            >
              <span className="flex  items-center">
                <div> {item.name}</div>
                {item.relatedServices && (
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                )}
              </span>
            </a>
            {item.relatedServices &&
              item.relatedServices &&
              index === hoveredMenu && (
                <div
                  className={`bg-primary flex absolute z-50  rounded-br-3 rounded--bottom left-0 leading-copy overflow-hidden shadow-1`}
                >
                  {generateSubMenu(item.relatedServices)}
                  {nestedData && (
                    <section
                      className="bg-primary text-sm h-full flex mt-4 border-y border-r"
                      onMouseLeave={() => setNestedData(null)}
                    >
                      <ul
                        className="mb-2 bg-washed-primary list-none m-0 pb-0  pr-0 overflow-y-auto overflow-x-hidden justify-start flex w-64 flex-col h-full"
                        style={{ maxHeight: "200px" }}
                      >
                        {nestedData.c_childProducts.map(
                          (item: any, index: any) => (
                            <li
                              className="hover:border-l-4 hover:underline hover:underline-offset-2 px-4 py-2"
                              key={index}
                            >
                              <a
                                className="text-white no-underline subcategory-item-link break-all"
                                href={`/${(item.slug && buildLink(item.slug)) || `#`
                                  }`}
                              >
                                {item.name}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </section>
                  )}
                </div>
              )}

          </section>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
export const buildLink = (slug: string) => {
  return slug.includes("staticfilter")
    ? slug.replace("html-", "html?").replace("-static", "&static")
    : slug;
};
