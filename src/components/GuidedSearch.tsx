import { useSearchActions } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import { useState, useEffect } from "react";

const serviceOptions = [
  "Budgeting and Cash Flow Management",
  "Estate Planning",
  "Business Banking",
  "Debt Management",
  "Insurance Services",
  "Investment Management",
  "Mortgage",
  "Lending",
  "Education Planning",
  "Retirement Planning",
];

const languageOptions = [
  "English",
  "American Sign Language",
  "Spanish",
  "Mandarin",
  "French",
  "Japanese",
  "Vietnamese",
  "Arabic",
  "Tagalog",
  "Korean",
];

const GuidedSearch = () => {
  const [service, setService] = useState("");
  const [locationDisplayName, setLocationDisplayName] = useState("");
  const [language, setLanguage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const searchActions = useSearchActions();
  searchActions.setVertical("financial_professionals");
  useEffect(() => {
    const executeSearch = () => {
      window.location.href = `/search.html?vertical=financial_professionals&query=${service.replaceAll(
        " ",
        "+"
      )}+advisors+in+${locationDisplayName.replaceAll(
        " ",
        "+"
      )}+who+speak+${language.replaceAll(" ", "+")}`;
    };
    if (currentStep === 4) {
      executeSearch();
    }
  }, [currentStep]);
  return (
    <section className="flex flex-col pb-36">
      {currentStep === 1 && (
        <section className="flex flex-col gap-8 items-center pt-20 mb-12 ">
          <h3 className="text-lg md:text-2xl font-bold">
            Search by City and State or Zip Code
          </h3>
          <FilterSearch
            placeholder="Search by location"
            customCssClasses={{
              filterSearchContainer: "flex justify-center",
              inputElement:
                "rounded-full px-4 md:px-8 py-2 md:py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-80 md:w-96 h-full",
              option: "py-2 px-4",
              highlighted: "font-bold text-sm md:text-base",
              nonHighlighted: "text-sm md:text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              const { fieldId, matcher, value } = params.newFilter;
              setLocationDisplayName(params.newDisplayName);
              setCurrentStep(2);
            }}
            searchFields={[
              {
                fieldApiName: "builtin.location",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
      {currentStep === 2 && (
        <section className="flex flex-col gap-8 items-center pt-20">
          <h3 className="text-lg md:text-2xl font-bold">
            What type of service you are looking for?
          </h3>
          <div className="flex flex-wrap gap-4 max-w-2xl px-4 items-center justify-center">
            {serviceOptions.map((service) => (
              <a
                key={service}
                className="md:p-4 p-2 px-4 text-sm md:text-base rounded-full bg-primary text-white opacity-85 hover:cursor-pointer hover:opacity-100 w-fit"
                onClick={() => {
                  setService(service);
                  setCurrentStep(3);
                }}
              >
                {service}
              </a>
            ))}
          </div>
          <div className="pt-10">Not sure which product you need?</div>
          <FilterSearch
            placeholder="Search for all Financial Products"
            customCssClasses={{
              filterSearchContainer: "flex justify-center",
              inputElement:
                "rounded-full px-4 md:px-8 py-2 md:py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-80 md:w-96 h-full",
              option: "py-2 px-4",
              highlighted: "font-bold text-sm md:text-base",
              nonHighlighted: "text-sm md:text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setService(params.newDisplayName);
              setCurrentStep(3);
            }}
            searchFields={[
              {
                fieldApiName: "fins_relatedServices.c_childProducts.name",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
      {currentStep === 3 && (
        <section className="flex flex-col gap-8 items-center pt-20">
          <h3 className="text-lg md:text-2xl font-bold">
            What language do you prefer to speak?
          </h3>
          <div className="flex flex-wrap gap-4 max-w-2xl px-4 items-center justify-center">
            {languageOptions.map((language) => (
              <a
                key={language}
                className="md:p-4 p-2 px-4 text-sm md:text-base rounded-full bg-primary text-white opacity-85 hover:cursor-pointer hover:opacity-100 w-fit"
                onClick={() => {
                  setLanguage(language);
                  setCurrentStep(4);
                }}
              >
                {language}
              </a>
            ))}
          </div>
          <div className="pt-10">
            Not sure of which languages our advisors speak?
          </div>
          <FilterSearch
            placeholder="Search for all Languages"
            customCssClasses={{
              filterSearchContainer: "flex justify-center",
              inputElement:
                "rounded-full px-4 md:px-8 py-2 md:py-4 border-zinc-900 text-base placeholder:text-neutral-500 w-80 md:w-96 h-full",
              option: "py-2 px-4",
              highlighted: "font-bold text-sm md:text-base",
              nonHighlighted: "text-sm md:text-base",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setLanguage(params.newDisplayName);
              setCurrentStep(4);
            }}
            searchFields={[
              {
                fieldApiName: "languages",
                entityType: "financialProfessional",
              },
            ]}
          />
        </section>
      )}
    </section>
  );
};

export default GuidedSearch;
