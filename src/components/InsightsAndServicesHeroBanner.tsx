import { Image } from "@yext/pages-components";
import { formatDate } from "../common/util";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
export interface InsightsAndServicesHeroBannerProps {
  document: any;
  pageType?: "product" | "service" | "insights";
}
type serviceProps = { name: string; slug: string };
const InsightsAndServicesHeroBanner = ({
  document,
  pageType,
}: InsightsAndServicesHeroBannerProps) => {
  const {
    name,
    primaryPhoto,
    c_insightsArticleSummary,
    datePosted,
    fins_servicesImage,
    c_serviceDescription,
    c_parentService,
  } = document;

  const buildSubNav = (service: serviceProps) => {
    const currentNavMenu: serviceProps[] = [
      { name: "Home", slug: "/homepage.html" },
      ...(service ? [{ name: service.name, slug: service.slug }] : []),
      { name: name, slug: "" },
    ];
    console.log(
      JSON.parse(
        JSON.stringify(
          currentNavMenu.filter((item) => JSON.stringify(item) !== "{}")
        )
      ).length
    );

    return (
      <ul className="flex gap-4 text-primary justify-start">
        {currentNavMenu
          .filter((item) => JSON.stringify(item) !== "{}")
          .map((item, index: number, filteredArray) => {
            console.log(filteredArray.length);

            return (
              <li key={index} className={`flex flex-row items-center`}>
                <a
                  href={`/${item.slug}`}
                  className={`${index + 1 !== filteredArray.length ? `hover:underline` : `pointer-events-none font-bold hover:no-underline`}`}
                >
                  {item.name}
                </a>
                {index + 1 !== filteredArray.length && (
                  <ChevronRightIcon className="ml-4 h-4 w-4 " />
                )}
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <>
      <section
        aria-label="Hero section"
        className={`${pageType === "insights" ? `bg-secondary` : `bg-white`}`}
      >
        {pageType !== "insights" &&
          buildSubNav(c_parentService?.at(-1) ?? null)}
        <h1 className="sr-only">{name}</h1>
        <article className="w-full flex flex-col md:flex-row gap-4 md:gap-16">
          <aside className="w-full md:w-1/2 ">
            <header className="flex justify-center items-center my-auto h-full">
              <div className="mx-auto max-w-2xl md:mx-0 md:max-w-xl">
                <h2 className="md:text-left">{name}</h2>
                {datePosted && (
                  <p className="mt-2 md:mt-6 md:text-left text-base md:text-lg font-semibold">
                    {formatDate(datePosted)}
                  </p>
                )}
                <p className={`mt-2 md:mt-6 text-left`}>
                  {c_insightsArticleSummary || c_serviceDescription}
                </p>
              </div>
            </header>
          </aside>

          {(primaryPhoto || fins_servicesImage) && (
            <>
              {pageType === "insights" && (
                <figure className="w-full md:right-0 md:top-0 md:h-full md:w-1/2">
                  <Image image={primaryPhoto} />
                </figure>
              )}
              {pageType !== "insights" && (
                <figure className="w-full md:right-0 md:top-0 md:h-full md:w-1/2">
                  <Image image={fins_servicesImage} />
                </figure>
              )}
            </>
          )}
        </article>
      </section>
    </>
  );
};

export default InsightsAndServicesHeroBanner;
