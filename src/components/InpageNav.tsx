import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface NavItem {
  name: string;
  navId: string;
}

export interface InpageNavProps {
  navItems: NavItem[];
}
const InpageNav = ({ navItems }: InpageNavProps) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);

  return (
    <>
      <ul className="hidden md:flex justify-center gap-10 py-4 bg-white">
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={`#${item.navId}`}>{item.name}</a>
          </li>
        ))}
      </ul>
      <ul className="md:hidden flex flex-col justify-center px-4 py-4 bg-white">
        <li className="flex justify-between items-center">
          <div
            onClick={() => setIsSubNavOpen(true)}
            className="hover:cursor-pointer flex-1"
          >
            Navigate to
          </div>
          <XMarkIcon
            className="h-4 w-4 hover:cursor-pointer"
            onClick={() => setIsSubNavOpen(false)}
          />
        </li>
        <hr className="mt-4" />
        {isSubNavOpen && (
          <span
            className="bg-white  rounded py-2  transition-all"
            style={{ opacity: isSubNavOpen ? 1 : 0 }}
          >
            {navItems.map((item, index) => (
              <span key={index}>
                <li className="text-sm">
                  <a href={`#${item.navId}`}>{item.name}</a>
                </li>
                <hr className="my-2" />
              </span>
            ))}
          </span>
        )}
      </ul>
    </>
  );
};

export default InpageNav;
