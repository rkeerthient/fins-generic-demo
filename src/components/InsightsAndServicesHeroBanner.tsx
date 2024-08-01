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
        <article className="relative z-10 mx-auto centered-container">
          <aside className="relative z-10 md:w-full ">
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
            <header className="relative px-6 py-24 md:px-8 md:py-24 md:pr-0">
              <div className="mx-auto max-w-2xl md:mx-0 md:max-w-xl">
                {!isInsights && (
                  <p className="   mb-10  lex relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Get in contact with an advisor that understands your goals.{" "}
                    <a
                      href="/guided-advisor-finder"
                      className="whitespace-nowrap font-semibold text-blue-950"
                    >
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      Find an Advisor <span aria-hidden="true">→</span>
                    </a>
                  </p>
                )}
                <h1 className="md:text-4xl font-bold tracking-tight text-blue-950  text-6xl">
                  {name}
                </h1>
                <p className="mt-6 md:text-base text-lg leading-8 text-gray-600">
                  {c_insightsArticleSummary}
                </p>
                {!c_insightsArticleSummary && (
                  <nav className="mt-10 flex items-center gap-x-6">
                    (
                    <a
                      href="/guided-advisor-finder"
                      className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Make an Appointment
                    </a>
                    )
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </nav>
                )}
              </div>
            </header>
          </aside>

          {primaryPhoto && (
            <figure className="h-48 w-full  md:absolute md:right-0 md:top-0 md:h-full md:w-1/2">
              <Image
                image={primaryPhoto}
                className="aspect-[3/2] object-cover md:aspect-auto md:h-full"
              />
            </figure>
          )}
        </article>
      </section>
    </>
  );
};

export default InsightsAndServicesHeroBanner;
