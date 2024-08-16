import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Image } from "@yext/pages-components";
import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { Fragment, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { useTypingEffect } from "../common/useTypeEffect";
import NavMenu from "./NavMenu";

type NavProps = {
  name?: string;
  slug?: string;
  relatedServices?: RelatedService[];
  c_childProducts?: childProducts[];
};

export interface RelatedService {
  c_childProducts?: childProducts[];
  name: string;
  slug: string;
}

type childProducts = {
  name: string;
  slug: string;
};

export const SearchBarComponent = ({
  id,
  isSearchPage,
}: {
  id: string;
  isSearchPage: boolean;
}) => {
  return (
    <>
      <SearchBar
        onSearch={handleSearch}
        customCssClasses={{
          searchBarContainer:
            "w-full text-secondary-text !-mb-2 md:flex-1 md:h-12",
          searchButton: "text-primary",
          inputElement: `!h-9 md:!h-11  demo ${id}`,
        }}
      />
    </>
  );
};

const handleSearch: onSearchFunc = (searchEventData) => {
  const { query } = searchEventData;
  window.location.href = `/search.html?query=${query}`;
};
const Header = ({ _site }: any) => {
  const { queryPrompts } = useTypingEffect();
  const {
    c_primaryNav,
    c_secondaryNav,
    c_topLeftNav,
    c_topRightNav,
    c_headerLogo,
  } = _site;
  useEffect(() => {
    const currLocation = window.location.pathname;
    currLocation.includes("search")
      ? setIsSearchPage(true)
      : setIsSearchPage(false);
  }, []);
  const initMenuItems = [...c_topLeftNav, ...c_primaryNav, ...c_topRightNav];
  const [menuItems, setMenuItems] = useState<NavProps[]>([
    ...c_topLeftNav,
    ...c_primaryNav,
    ...c_topRightNav,
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const [previousMenus, setPreviousMenus] = useState<NavProps[][]>([]);

  const handleMenuClick = (service: any) => {
    setPreviousMenus((prev) => [...prev, menuItems as NavProps[]]);
    const relatedServices = service.relatedServices || [];
    const childProducts = service.c_childProducts || [];

    const newMenuItems: NavProps[] =
      relatedServices.length >= 2
        ? relatedServices
        : relatedServices?.[0]?.c_childProducts || childProducts;

    setMenuItems(newMenuItems);
  };

  const handleBackClick = () => {
    const previous = previousMenus.pop();
    if (previous) {
      setMenuItems(previous);
    }
  };

  return (
    <>
      <header className="p-6 justify-between items-center w-full max-w-screen-3xl bg-primary text-white md:flex flex-col gap-4 hidden ">
        <nav
          className="flex justify-between items-center w-full"
          aria-labelledby="top-left-nav"
        >
          <h2 id="top-left-nav" className="sr-only">
            Top Left Navigation
          </h2>
          <ul className="flex items-center" aria-label="Primary navigation">
            {c_primaryNav.map((item: NavProps, index: number) => (
              <li key={index} className="ml-4 text-sm ">
                <a className="hover:underline" href="#">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <nav aria-labelledby="top-right-nav">
            <h2 id="top-right-nav" className="sr-only">
              Top Right Navigation
            </h2>
            <ul className="flex" aria-label="Top right navigation">
              {c_topRightNav.map((item: NavProps, index: number) => (
                <li key={index} className="text-sm ml-4">
                  <a
                    className="hover:underline"
                    href={
                      item.slug
                        ? `/${item.slug.includes("search") ? item.slug.replaceAll("/", "?") : item.slug}`
                        : "#"
                    }
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </nav>
        <nav
          aria-labelledby="primary-nav"
          className="flex flex-row items-center justify-start w-full"
        >
          <h2 id="primary-nav" className="sr-only">
            Primary Navigation
          </h2>

          <div className="flex items-center gap-4 w-full justify-start">
            <a href="/">
              <Image image={c_headerLogo!} width={259} layout="fixed" />
            </a>
            <NavMenu isPrimary={true} menuItems={c_topLeftNav} />

            {!isSearchPage && (
              <SearchBarComponent
                id="desktop-search-bar"
                isSearchPage={isSearchPage}
              />
            )}
          </div>
        </nav>
      </header>
      <header className="p-6 justify-between items-center w-full max-w-screen-3xl bg-primary text-white md:hidden h-20 flex ">
        <div className="flex justify-between items-center font-bold w-full">
          <div className="ml-2">
            <a href="/">
              <Image
                image={c_headerLogo!}
                width={150}
                className="!h-auto"
                layout="fixed"
              />
            </a>
          </div>
          <div className="flex gap-4">
            {!isSearchPage && (
              <CiSearch
                className="h-5 w-5"
                onClick={() => setIsSearchOpen(true)}
              />
            )}
            <FaBars className="h-5 w-5" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
        <Transition appear show={isMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsMenuOpen(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                aria-hidden="true"
              />
            </TransitionChild>
            <div className="fixed inset-0 flex justify-end">
              <TransitionChild
                as={Fragment}
                enter="transition-transform ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="w-full bg-primary p-6 text-white ">
                  <aside className="flex justify-between items-center">
                    {previousMenus.length > 0 && (
                      <button
                        onClick={handleBackClick}
                        className="mb-4 flex items-center"
                      >
                        <ChevronLeftIcon className="w-5 h-5 mr-2" />
                      </button>
                    )}
                    <button
                      className="text-white mb-4 flex justify-end ml-auto"
                      onClick={() => {
                        setIsMenuOpen(false),
                          setPreviousMenus([]),
                          setMenuItems(initMenuItems);
                      }}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </aside>

                  {menuItems && (
                    <nav aria-labelledby="drawer-top-right-nav">
                      <h2 id="drawer-top-right-nav" className="sr-only">
                        Top Right Navigation
                      </h2>
                      <ul
                        className="flex flex-col"
                        aria-label="Top right navigation"
                      >
                        {menuItems.map((item: NavProps, index: number) => (
                          <li
                            key={index}
                            className="flex justify-between items-center mb-4"
                          >
                            <a
                              href={
                                item.slug
                                  ? `/${item.slug.includes("search") ? item.slug.replaceAll("/", "?") : item.slug}`
                                  : "#"
                              }
                            >
                              {item.name}
                            </a>
                            {((item.relatedServices?.length ?? 0) ||
                              (item.c_childProducts?.length ?? 0) >= 2 ||
                              item.c_childProducts?.some((child: any) =>
                                Array.isArray(child)
                              )) && (
                              <ChevronRightIcon
                                className="h-4 w-4"
                                onClick={() => handleMenuClick(item)}
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isSearchOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsSearchOpen(false)}
          >
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0  bg-opacity-0 "
                aria-hidden="true"
              />
            </TransitionChild>
            <div className="fixed inset-0 flex justify-end w-full h-20">
              <TransitionChild
                as={Fragment}
                enter="transition-transform ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="w-full bg-white p-6 text-white flex border items-center">
                  <SearchBarComponent
                    id="mobile-search-bar"
                    isSearchPage={isSearchPage}
                  />
                  <button
                    className="text-white flex justify-end ml-2"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <XMarkIcon className="h-8 w-8 text-primary" />
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </header>
    </>
  );
};

export default Header;
