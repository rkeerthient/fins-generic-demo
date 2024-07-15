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
      className="grid grid-cols-3 justify-between gap-8"
      aria-labelledby="wealth-manager-details"
    >
      <h1 id="wealth-manager-details" className="sr-only">
        Wealth Manager Detailed Page
      </h1>

      <article className="flex flex-col gap-4 p-4 border rounded-md">
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-medium underline">Experience</h2>
          <p>{yearsOfExperience || 2} Years</p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-medium underline">Language(s)</h2>
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
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-medium underline">Client Focuses</h2>
          <ul className="flex flex-col gap-2">
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
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-medium underline">Certifications</h2>
          <ul className="flex flex-col gap-1">
            {certifications.map((item: string, index: any) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-medium underline">Interests</h2>
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
