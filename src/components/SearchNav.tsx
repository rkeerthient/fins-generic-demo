import { useState } from "react";
import { verticalInterface, verticalNavItems } from "./SearchPage";

type SearchNavProps = {
  setCurrentVertical: (currentVertical: verticalInterface) => void;
};

const SearchNav = ({ setCurrentVertical }: SearchNavProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<string>("all");
  return (
    <nav className="bg-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="hidden md:flex space-x-4">
          {verticalNavItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.key.toLowerCase()}`}
              className=" hover:text-gray-300"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="md:hidden  w-full flex-row flex items-center">
          {verticalNavItems
            .filter((item) => item.key === "all" || item.key === selected)
            .map((item, index) => (
              <a
                key={index}
                href={`#${item.key.toLowerCase()}`}
                className="  hover:text-gray-300 mr-4  text-[#777777]"
              >
                {item.name}
              </a>
            ))}
          <div className="relative ml-auto z-50">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=" hover:text-gray-300 focus:outline-none "
            >
              More
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
                {verticalNavItems
                  .filter((item) => item.key !== "all" && item.key !== selected)
                  .map((item, index) => (
                    <a
                      key={index}
                      onClick={() => {
                        setSelected(item.key), setCurrentVertical(item);
                      }}
                      href={`#${item.key.toLowerCase()}`}
                      className="block px-4 py-2  hover:text-gray-300 text-[#777777]"
                    >
                      {item.name}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SearchNav;
