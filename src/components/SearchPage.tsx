import {
  Result,
  UniversalLimit,
  useSearchActions,
  VerticalResults as VR,
} from "@yext/search-headless-react";
import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { useEffect, useState, useCallback } from "react";
import { useLocationsContext } from "../common/LocationsContext";
import FAQPage from "./pages/FAQPage";
import Locator from "./pages/LocationsPage";
import ProfessionalPage from "./pages/ProfessionalPage";
import UniversalPage from "./pages/UniversalPage";
import SearchNav from "./SearchNav";
import InsightsPage from "./pages/InsightsPage";
import ServicesPage from "./pages/ServicesPage";
import DocumentPage from "./pages/DocumentPage";
import ProductsPage from "./pages/ProductsPage";

export type VerticalInterface = {
  name: string;
  key: string;
};

export const verticalNavItems: VerticalInterface[] = [
  { name: "All", key: "all" },
  { name: "Professionals", key: "financial_professionals" },
  { name: "Locations", key: "locations" },
  { name: "FAQs", key: "faqs" },
  { name: "Services", key: "services" },
  { name: "Products", key: "financial_products" },
  { name: "Documents", key: "documents" },
  { name: "Insights", key: "insights_articles" },
];

const PAGE_COMPONENTS: { [key: string]: React.ElementType } = {
  faqs: FAQPage,
  financial_professionals: ProfessionalPage,
  insights_articles: InsightsPage,
  services: ServicesPage,
  documents: DocumentPage,
  locations: Locator,
  financial_products: ProductsPage,
  all: UniversalPage,
};

const UNIVERSAL_LIMIT: UniversalLimit = {
  faqs: 4,
  healthcare_facilities: 4,
  healthcare_professionals: 4,
  specialties: 4,
};

const getPageComponent = (key: string) => PAGE_COMPONENTS[key] || UniversalPage;

const SearchPage = () => {
  const context = useLocationsContext();
  const [results, setResults] = useState<
    (VR[] | Result<Record<string, unknown>> | undefined)[]
  >([]);
  const searchActions = useSearchActions();
  const [currentVertical, setCurrentVertical] = useState<VerticalInterface>(
    verticalNavItems[0]
  );

  const executeSearch = useCallback(() => {
    if (currentVertical.key === "all") {
      searchActions.setUniversal();
      searchActions.setUniversalLimit(UNIVERSAL_LIMIT);
      searchActions.executeUniversalQuery().then((res: any) => {
        setResults(res?.verticalResults || []);
      });
    } else {
      searchActions.setVertical(currentVertical.key);
      searchActions.executeVerticalQuery().then((res: any) => {
        setResults(res?.verticalResults.results || []);
      });
    }
  }, [currentVertical, searchActions]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verticalParam = searchParams.get("vertical");
    const queryString = searchParams.get("query");

    if (verticalParam) {
      const matchedVertical = verticalNavItems.find(
        (item) => item.key.toLowerCase() === verticalParam.toLowerCase()
      );
      setCurrentVertical(matchedVertical || verticalNavItems[0]);
    }

    if (queryString) {
      searchActions.setQuery(queryString);
    }
  }, [searchActions]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (currentVertical.key.toLowerCase() !== "all") {
      searchParams.set("vertical", currentVertical.key);
    } else {
      searchParams.delete("vertical");
    }
    window.history.pushState(null, "", "?" + searchParams.toString());
    executeSearch();
  }, [currentVertical, executeSearch]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const searchParams = new URLSearchParams(window.location.search);
    executeSearch();
    if (query) {
      searchParams.set("query", query);
    } else {
      searchParams.delete("query");
    }
    history.pushState(null, "", "?" + searchParams.toString());
  };

  const PageComponent = getPageComponent(currentVertical.key);

  return (
    <section className="w-full flex flex-col gap-4">
      <h1 className="sr-only">Search Page</h1>
      <header className="bg-[#e7eaea]">
        <section className="centered-container">
          <h2 className="sr-only">Search Section</h2>
          <section className="px-8 pt-8">
            <h2 className="sr-only">Search Bar</h2>
            <SearchBar onSearch={handleSearch} />
          </section>
          <nav>
            <h2 className="sr-only">Navigation</h2>
            <SearchNav
              currentVertical={currentVertical}
              setCurrentVertical={setCurrentVertical}
            />
          </nav>
        </section>
      </header>
      <main className="w-full">
        <h2 className="sr-only">Search Results</h2>
        <PageComponent verticalKey={currentVertical.key} />
      </main>
    </section>
  );
};

export default SearchPage;
