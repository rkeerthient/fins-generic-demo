import { Image } from "@yext/pages-components";
import { formatDate } from "../common/util";
export interface InsightsAndServicesHeroBannerProps {
  document: any;
  isInsights?: boolean;
}

const InsightsAndServicesHeroBanner = ({
  document,
  isInsights = false,
}: InsightsAndServicesHeroBannerProps) => {
  const {
    name,
    primaryPhoto,
    c_insightsArticleSummary,
    datePosted,
    fins_servicesImage,
    c_serviceDescription,
  } = document;

  return (
    <>
      <section
        aria-label="Hero section"
        className={`${isInsights ? `bg-secondary` : `bg-white`}`}
      >
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
            <figure className="w-full md:right-0 md:top-0 md:h-full md:w-1/2">
              <Image image={isInsights ? primaryPhoto : fins_servicesImage} />
            </figure>
          )}
        </article>
      </section>
    </>
  );
};

export default InsightsAndServicesHeroBanner;
