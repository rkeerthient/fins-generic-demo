import {
  AppliedFilters,
  Geolocation,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import Loader from "../Loader";
import ServicesCard from "../cards/ServicesCard";
import { useVerticalSearch } from "../useVerticalSearch";
import { PageProps } from "./FAQPage";

const ServicesPage = ({ verticalKey }: PageProps) => {
  const { isLoaded } = useVerticalSearch(verticalKey) || false;

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-row gap-2 mt-4 w-full md:px-14 px-4 ">
          <div className="flex-grow  w-full">
            <div className="flex flex-col items-baseline  ">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={ServicesCard}
              customCssClasses={{
                verticalResultsContainer:
                  "grid grid-cols-1 md:grid-cols-4 gap-8",
              }}
            />
            <Pagination />
            <Geolocation />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ServicesPage;
