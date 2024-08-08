import { Image } from "@yext/pages-components";
import { EntityReference } from "../types/site";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { useTypingEffect } from "../common/useTypeEffect";

type NavProps = {
  name?: string;
  slug?: string;
  relatedServices?: EntityReference[];
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
      {!isSearchPage && (
        <SearchBar
          onSearch={handleSearch}
          customCssClasses={{
            searchBarContainer: "w-full !-mb-2 md:w-2/4 md:h-12",
            searchButton: "text-primary",
            inputElement: `!h-9 md:!h-11 demo ${id}`,
          }}
        />
      )}
    </>
  );
};

const handleSearch: onSearchFunc = (searchEventData) => {
  const { query } = searchEventData;
  window.location.href = `/search.html?query=${query}`;
};
const Header = ({ _site }: any) => {
  useEffect(() => {
    const currLocation = window.location.pathname;
    currLocation.includes("search")
      ? setIsSearchPage(true)
      : setIsSearchPage(false);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const {
    c_primaryNav,
    c_secondaryNav,
    c_topLeftNav,
    c_topRightNav,
    c_headerLogo,
  } = _site;
  const { queryPrompts } = useTypingEffect(
    import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY,
    import.meta.env.YEXT_PUBLIC_SEARCH_EXP_KEY
  );

  return (
    <>
      <>
        <header className="p-6 justify-between items-center w-full max-w-screen-3xl bg-primary text-white md:flex flex-col gap-4 hidden ">
          <nav
            className="flex justify-between items-center w-full"
            aria-labelledby="top-left-nav"
          >
            <h2 id="top-left-nav" className="sr-only">
              Top Left Navigation
            </h2>
            <ul className="flex" aria-label="Top left navigation">
              {c_topLeftNav.map((item: NavProps, index: number) => (
                <li key={index} className="text-sm ml-4">
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
                    <a className="hover:underline" href="#">
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

            <div className="flex items-center gap-4 w-full justify-between">
              <a href="/homepage">
                <Image image={c_headerLogo!} width={259} layout="fixed" />
              </a>
              <ul
                className="flex items-center ml-4"
                aria-label="Primary navigation"
              >
                {c_primaryNav.map((item: NavProps, index: number) => (
                  <li key={index} className="ml-4 ">
                    <a className="hover:underline" href="#">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <SearchBarComponent
                id="desktop-search-bar"
                isSearchPage={isSearchPage}
              />
            </div>
          </nav>
        </header>
        <header className="p-6 justify-between items-center w-full max-w-screen-3xl bg-primary text-white md:hidden h-20 flex ">
          <div className="flex justify-between items-center font-bold w-full">
            <div className="ml-2">
              <a href="/homepage">
                <Image
                  image={c_headerLogo!}
                  width={150}
                  className="!h-auto"
                  layout="fixed"
                />
              </a>
            </div>
            <div className="flex gap-4">
              <CiSearch
                className="h-5 w-5"
                onClick={() => setIsSearchOpen(true)}
              />
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
                  <DialogPanel className="w-full bg-primary p-6 text-white">
                    <button
                      className="text-white mb-4 flex justify-end ml-auto"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                    <nav aria-labelledby="drawer-top-left-nav">
                      <h2 id="drawer-top-left-nav" className="sr-only">
                        Top Left Navigation
                      </h2>
                      <ul
                        className="flex flex-col"
                        aria-label="Top left navigation"
                      >
                        {c_topLeftNav.map((item: NavProps, index: number) => (
                          <li key={index} className="  mb-4">
                            <a href="#">{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <nav aria-labelledby="drawer-top-right-nav">
                      <h2 id="drawer-top-right-nav" className="sr-only">
                        Top Right Navigation
                      </h2>
                      <ul
                        className="flex flex-col"
                        aria-label="Top right navigation"
                      >
                        {c_topRightNav.map((item: NavProps, index: number) => (
                          <li key={index} className=" mb-4">
                            <a href={`${item.slug ? `/${item.slug}` : `#`}`}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <nav aria-labelledby="drawer-primary-nav">
                      <h2 id="drawer-primary-nav" className="sr-only">
                        Primary Navigation
                      </h2>
                      <ul
                        className="flex flex-col"
                        aria-label="Primary navigation"
                      >
                        {c_primaryNav.map((item: NavProps, index: number) => (
                          <li key={index} className=" mb-4">
                            <a href="#">{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </nav>
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
    </>
  );
};

export default Header;
