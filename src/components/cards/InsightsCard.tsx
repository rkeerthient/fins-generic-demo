import {
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import HoursText from "../HoursText";
import Cta from "../cta";
import { FormatAddress, FormatPhoneNumber } from "../../common/util";

const InsightsCard = ({ result }: CardProps<any>) => {
  const { name } = result;
  const { datePosted, slug, primaryPhoto, c_insightsArticleSummary } =
    result.rawData;

  return (
    <article className="border rounded-lg">
      <header className="relative flex flex-col bg-white p-4 gap-4">
        <figure className="group aspect-square block overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 bottom-12 w-full">
          {primaryPhoto && (
            <Image
              image={primaryPhoto!}
              className="pointer-events-none !aspect-square  !max-w-none !object-top rounded-lg w-72  "
            />
          )}
        </figure>

        <section className="px-2 flex flex-col gap-3">
          <h2 className=" h-10">
            <a href={`/${slug}`} className="text-lg font-bold">
              {name}
            </a>
          </h2>
          <p className="pointer-events-none font-medium line-clamp-4">
            {c_insightsArticleSummary}
          </p>

          <article className=" flex flex-col md:flex-row gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <Cta
              buttonText="Learn more"
              style="secondary"
              url={`/${slug}`}
              classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1"
            />
          </article>
        </section>
      </header>
    </article>
  );
};

export default InsightsCard;
