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
import DocumentCard from "../cards/DocumentCard";

const DocumentPage = ({ verticalKey }: PageProps) => {
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
              CardComponent={DocumentCard}
              customCssClasses={{
                verticalResultsContainer: "flex flex-col gap-8",
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

export default DocumentPage;
