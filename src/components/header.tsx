import { Image } from "@yext/pages-components";
import Cta from "../components/cta";
import ProfessionalsOnlyPage from "./pages/ProfessionalsOnlyPage";
import { EntityReference } from "../types/site";

type NavProps = {
  name?: string;
  slug?: string;
  relatedServices?: EntityReference[];
};

const Header = ({ _site }: any) => {
  const {
    c_primaryNav,
    c_secondaryNav,
    c_topLeftNav,
    c_topRightNav,
    c_headerLogo,
  } = _site;

  return (
    <header className="p-6   justify-between items-center w-full max-w-screen-3xl bg-primary text-white flex flex-col gap-4">
      <nav className="flex justify-between items-center w-full">
        <ul className="flex">
          {c_topLeftNav.map((item: NavProps, index: number) => (
            <li key={index} className="text-sm ml-4">
              {item.name}
            </li>
          ))}
        </ul>
        <ul className="flex">
          {c_topRightNav.map((item: NavProps, index: number) => (
            <li key={index} className="text-sm ml-4">
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <nav className="flex flex-row items-center justify-start w-full">
        <div className="flex items-center">
          <Image image={c_headerLogo!} />
          <ul className="flex items-center ml-4">
            {c_primaryNav.map((item: NavProps, index: number) => (
              <li key={index} className="ml-4 ">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
