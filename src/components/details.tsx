import { TemplateProps } from "@yext/pages/*";
import Fins_service from "../types/services";

const Details = ({ document }: any) => {
  const {
    yearsOfExperience,
    certifications,
    interests,
    languages,
    fins_relatedServices,
  } = document;
  const _languages = ["English", "French", "Spanish"];
  return (
    <section
      className=" w-[96%] mx-auto md:w-full grid grid-cols-1 md:grid-cols-3 justify-between gap-4 md:gap-8 "
      aria-labelledby="wealth-manager-details"
    >
      <h1 id="wealth-manager-details" className="sr-only">
        Wealth Manager Detailed Page
      </h1>

      <article className="flex flex-col gap-2 md:gap-4 p-4 border rounded-md">
        <section className="flex flex-col">
          <h3>Experience</h3>
          <p>{yearsOfExperience || 2} Years</p>
        </section>
        <section className="flex flex-col lead">
          <h3>Language(s)</h3>
          <ul className="flex flex-col gap-1">
            {languages.length >= 1
              ? languages.map((item: string, index: any) => (
                  <li key={index}>{item}</li>
                ))
              : _languages.map((item: string, index: any) => (
                  <li key={index}>{item}</li>
                ))}
          </ul>
        </section>
      </article>

      <article className="flex flex-col gap-4 p-4 border rounded-md">
        <section className="flex flex-col md:gap-2">
          <h3>Client Focuses</h3>
          <ul className="flex flex-col gap-1">
            {fins_relatedServices.map(
              (
                item: {
                  name: string;
                  fins_servicesImage: string;
                  description: string;
                },
                index: any
              ) => (
                <li key={index}>{item.name}</li>
              )
            )}
          </ul>
        </section>
      </article>

      <article className="flex flex-col gap-4 p-4 border rounded-md">
        <section className="flex flex-col">
          <h3>Certifications</h3>
          <ul className="flex flex-col gap-1">
            {certifications.map((item: string, index: any) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col">
          <h3>Interests</h3>
          <ul className="flex flex-col gap-1">
            {interests.map((item: string, index: any) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </article>
    </section>
  );
};

export default Details;
