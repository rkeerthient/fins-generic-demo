import { CardProps } from "@yext/search-ui-react";
import { FaRegFilePdf } from "react-icons/fa6";
import Cta from "../cta";

const DocumentCard = ({ result }: CardProps<any>) => {
  const {
    landingPageUrl,
    s_snippet,
    c_file: { name, size, mimeType },
  } = result.rawData;

  return (
    <article className="border rounded-lg">
      <header className="relative flex flex-col md:flex-row bg-white md:p-4 p-2 gap-4 w-full">
        <FaRegFilePdf className="w-24 h-24" />

        <section className="px-2 flex flex-col gap-3">
          <h2>
            <a
              href={`${landingPageUrl}`}
              className="text-lg font-bold"
            >
              {name}
            </a>
          </h2>
          <p>File type - {mimeType}</p>
          <p>Size - {size}kb</p>
          {s_snippet && <p className="italic break-all">{s_snippet}</p>}
          <article className=" flex flex-col md:flex-row gap-4 justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <Cta
              buttonText="Learn more"
              style="secondary"
              url={landingPageUrl}
              classNames="md:px-4 md:py-1 md:text-sm rounded-md px-2 py-1"
            />
          </article>
        </section>
      </header>
    </article>
  );
};

export default DocumentCard;
