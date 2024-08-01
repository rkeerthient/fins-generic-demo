import { Image } from "@yext/pages-components";
// import "./style.css";
export interface InsightsAndServicesHeroBannerProps {
  document: any;
  isInsights?: boolean;
}

const InsightsAndServicesHeroBanner = ({
  document,
  isInsights,
}: InsightsAndServicesHeroBannerProps) => {
  const { name, primaryPhoto, c_insightsArticleSummary } = document;

  return (
    <>
      <section aria-label="Hero section" className=" bg-primary-bg">
        <h1 className="sr-only">{name}</h1>
        <article className="w-full flex gap-16">
          <aside className=" w-1/2 ">
            {!isInsights && (
              <svg
                className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white md:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="0,0 90,0 50,100 0,100"></polygon>
              </svg>
            )}
            <header className="  flex justify-center items-center my-auto h-full">
              <div className="mx-auto max-w-2xl md:mx-0 md:max-w-xl">
                <h1 className="md:text-4xl font-bold tracking-tight ">
                  {name}
                </h1>
                <p className="mt-6 md:text-base text-lg leading-8 text-gray-600">
                  {c_insightsArticleSummary}
                </p>
              </div>
            </header>
          </aside>

          {primaryPhoto && (
            <figure className=" w-full  md:right-0 md:top-0 md:h-full md:w-1/2">
              <Image image={primaryPhoto} />
            </figure>
          )}
        </article>
      </section>
    </>
  );
};

export default InsightsAndServicesHeroBanner;
