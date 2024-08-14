import { Image } from "@yext/pages-components";
import { Image as _Image } from "../types/site";
import { formatDate } from "../common/util";

type InsightsProps = {
  name: string;
  slug: string;
  c_insightsArticleSummary: string;
  primaryPhoto: _Image;
  datePosted: string;
};

type InsightsCardProps = {
  _data: InsightsProps;
  showImage?: boolean;
  lineClamp?: number;
};

const OurInsights = ({
  linkedArticles,
}: {
  linkedArticles: InsightsProps[];
}) => {
  if (linkedArticles.length === 0) {
    return null;
  }

  const _first: InsightsProps = linkedArticles[0];
  const _rest: InsightsProps[] = linkedArticles.slice(1);

  return (
    <>
      <article className="hidden md:flex gap-8">
        <section className="flex flex-col gap-2 w-1/2">
          <InsightsCard _data={_first} showImage={true} lineClamp={4} />
        </section>
        <article className="flex flex-col gap-4 w-1/2">
          {_rest.map((item, index) => (
            <InsightsCard _data={item} key={index} lineClamp={3} />
          ))}
        </article>
      </article>
      <article className="flex gap-8">
        <article className="flex flex-col gap-4 w-[96%] justify-between items-center mx-auto md:hidden ">
          {linkedArticles.map((item, index) => (
            <InsightsCard _data={item} key={index} lineClamp={3} />
          ))}
        </article>
      </article>
    </>
  );
};

export default OurInsights;

export const InsightsCard = ({
  _data,
  showImage = false,
  lineClamp,
}: InsightsCardProps) => {
  return (
    <section className="flex flex-col gap-2">
      {showImage && (
        <Image
          image={_data.primaryPhoto}
          className="!mb-4 max-w-[700px] !aspect-video"
        ></Image>
      )}
      <p className="text-sm">{formatDate(_data.datePosted)}</p>
      <h3>{_data.name}</h3>
      <p
        className={`${lineClamp === 4 ? `line-clamp-4` : `line-clamp-3`} ${showImage ? `text-base` : `text-sm`}`}
      >
        {_data.c_insightsArticleSummary}
      </p>
      <a
        className={`${showImage ? `text-base` : `text-sm`}  font-medium flex gap-1 items-center hover:cursor-pointer hover:underline mt-4 text-primary`}
      >
        Read more
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          ></path>
        </svg>
      </a>
      {!showImage && <hr />}
    </section>
  );
};
