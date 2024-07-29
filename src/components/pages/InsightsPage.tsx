import {
  AppliedFilters,
  Facets,
  Geolocation,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import ProfessionalCard from "../cards/ProfessionalCard";
import { useVerticalSearch } from "../useVerticalSearch";
import { PageProps } from "./FAQPage";
import Loader from "../Loader";
import InsightsCard from "../cards/InsightsCard";

const InsightsPage = ({ verticalKey }: PageProps) => {
  const { isLoaded } = useVerticalSearch(verticalKey) || false;

  return (
    <>
      {isLoaded ? (
        <div className="flex flex-row gap-2 mt-4 w-full md:px-14 px-4 ">
          {/* <div className="hidden md:block w-1/5">
            <Facets
              customCssClasses={{ facetsContainer: "ml-8 mr-4 " }}
            ></Facets>
          </div> */}
          <div className="flex-grow  w-full">
            <div className="flex flex-col items-baseline  ">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={InsightsCard}
              customCssClasses={{
                verticalResultsContainer:
                  "grid grid-cols-1 md:grid-cols-4 gap-8",
              }}
            />
            <p className="my-8"></p>
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

export default InsightsPage;
