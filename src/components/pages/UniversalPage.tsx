import { useSearchActions } from "@yext/search-headless-react";
import {
  DirectAnswer,
  ResultsCount,
  UniversalResults,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Mapboxuniv from "../Mapboxuniv";
import DocumentCard from "../cards/DocumentCard";
import FAQCard from "../cards/FAQCard";
import LocationCard from "../cards/LocationCard";
import ProfessionalCardUniv from "../cards/ProfessionalCardUniv";
import ServicesCard from "../cards/ServicesCard";

const UniversalPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchActions = useSearchActions();

  useEffect(() => {
    setIsLoaded(false);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery().then((res) => setIsLoaded(true));
  }, []);

  const MapSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div className="flex flex-col gap-4">
        <div>{header}</div>
        <div className="univLocMap">
          <Mapboxuniv data={results} />
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {results.map((r: any, index: number) => (
              <CardComponent key={index} result={r} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  const Grid4Section = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="flex flex-col gap-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const HiddenSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div></div>;
    }
    return <div className="hidden"></div>;
  };

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <>
        {!isLoaded ? (
          <Loader />
        ) : (
          <>
            <ResultsCount />
            <DirectAnswer />
            <UniversalResults
              verticalConfigMap={{
                faqs: {
                  label: "FAQs",
                  CardComponent: FAQCard,
                  SectionComponent: FlexSection,
                },
                services: {
                  label: "Services",
                  CardComponent: ServicesCard,
                  SectionComponent: Grid4Section,
                },
                locations: {
                  label: "Locations",
                  CardComponent: LocationCard,
                  SectionComponent: MapSection,
                },
                financial_professionals: {
                  label: "Professionals",
                  CardComponent: ProfessionalCardUniv,
                  SectionComponent: Grid4Section,
                },
                documents: {
                  label: "Documents",
                  CardComponent: DocumentCard,
                  SectionComponent: FlexSection,
                },
                links: {
                  label: "",
                  CardComponent: undefined,
                  SectionComponent: HiddenSection,
                },
                cities: {
                  label: "",
                  CardComponent: undefined,
                  SectionComponent: HiddenSection,
                },
                financial_products: {
                  label: "",
                  CardComponent: undefined,
                  SectionComponent: HiddenSection,
                },
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

export default UniversalPage;
