import {
  Result,
  UniversalLimit,
  useSearchActions,
  VerticalResults as VR,
} from "@yext/search-headless-react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { useLocationsContext } from "../common/LocationsContext";
import FAQPage from "./pages/FAQPage";
import Locator from "./pages/LocationsPage";
import ProfessionalPage from "./pages/ProfessionalPage";
import UniversalPage from "./pages/UniversalPage";
import { useTypingEffect } from "./useTypeEffect";
import SearchNav from "./SearchNav";
import InsightsPage from "./pages/InsightsPage";
import ServicesPage from "./pages/ServicesPage";
import DocumentPage from "./pages/DocumentPage";
import ProductsPage from "./pages/ProductsPage";
export type verticalInterface = {
  name: string;
  key: string;
};

export const verticalNavItems: verticalInterface[] = [
  {
    name: "All",
    key: "all",
  },
  {
    name: "Professionals",
    key: "financial_professionals",
  },
  {
    name: "Locations",
    key: "locations",
  },
  {
    name: "FAQs",
    key: "faqs",
  },
  {
    name: "Services",
    key: "services",
  },
  {
    name: "Products",
    key: "financial_products",
  },
  {
    name: "Documents",
    key: "documents",
  },

  {
    name: "Insights",
    key: "insights_articles",
  },
];

const SearchPage = () => {
  // const { queryPrompts } = useTypingEffect(
  //   import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY,
  //   import.meta.env.YEXT_PUBLIC_SEARCH_EXP_KEY
  // );

  const context = useLocationsContext();
  const [results, setResults] = useState<
    (VR[] | Result<Record<string, unknown>>)[]
  >([]);
  const searchActions = useSearchActions();
  const [currentVertical, setCurrentVertical] = useState<verticalInterface>({
    name: "All",
    key: "all",
  });
  const universalLimit: UniversalLimit = {
    faqs: 4,
    healthcare_facilities: 4,
    healthcare_professionals: 4,
    specialties: 4,
  };

  const executeSearch = () => {
    if (currentVertical.key === "all") {
      searchActions.setUniversal();
      searchActions.setUniversalLimit(universalLimit);
      searchActions.executeUniversalQuery().then((res: any) => {
        setResults(res?.verticalResults);
      });
    } else {
      searchActions.setVertical(currentVertical.key);
      searchActions.executeVerticalQuery().then((res: any) => {
        setResults(res?.verticalResults.results);
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    executeSearch();
    if (currentVertical?.key.toLowerCase() !== "all") {
      searchParams.set("vertical", currentVertical.key);
    } else {
      searchParams.delete("vertical");
    }
    history.pushState(null, "", "?" + searchParams.toString());
  }, [currentVertical]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verticalParam = searchParams.get("vertical");
    const queryString = searchParams.get("query");

    if (verticalParam) {
      const matchedVertical = verticalNavItems.find(
        (item) => item.key.toLowerCase() === verticalParam.toLowerCase()
      );
      if (matchedVertical) {
        setCurrentVertical(matchedVertical);
      }
    }

    if (queryString) {
      searchActions.setQuery(queryString);
    }
  }, []);

  const handleSearch = ({ query }: any) => {
    const searchParams = new URLSearchParams(window.location.search);
    executeSearch();
    if (query) {
      searchParams.set("query", query);
    } else {
      searchParams.delete("query");
    }
    history.pushState(null, "", "?" + searchParams.toString());
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-[#e7eaea]">
        <div className="centered-container">
          <div className="px-8 pt-8">
            <SearchBar
              onSearch={handleSearch}
              // customCssClasses={{ inputElement: "demo " }}
            ></SearchBar>
          </div>
          <SearchNav
            setCurrentVertical={(vertical: verticalInterface) =>
              setCurrentVertical(vertical)
            }
          />
        </div>
      </div>
      <div className="w-full ">
        {currentVertical &&
          (currentVertical.key === "faqs" ? (
            <FAQPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "financial_professionals" ? (
            <ProfessionalPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "insights_articles" ? (
            <InsightsPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "services" ? (
            <ServicesPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "documents" ? (
            <DocumentPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "locations" ? (
            <Locator verticalKey={currentVertical.key} />
          ) : currentVertical.key === "financial_products" ? (
            <ProductsPage verticalKey={currentVertical.key} />
          ) : (
            <UniversalPage />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
