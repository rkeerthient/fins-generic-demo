import { JsonLd } from "react-schemaorg";
import {
  BlogPosting,
  FAQPage,
  FinancialService,
  Person,
  Place,
} from "schema-dts";
import { useEffect, useState } from "react";

const LocSchema = (props: any) => {
  const { document } = props;
  const name = `${document.name} in ${document.address.city}, ${document.address.region}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.description;
  const faqsList: any = [];
  const empList: any = [];
  const blogsList: any = [];

  const [windowUrl, setWindowUrl] = useState("");
  const [windowProtocolHost, setWindowProtocolHost] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowUrl(window.location.href);
      setWindowProtocolHost(
        `${window.location.protocol}//${window.location.host}`
      );
    }
  }, []);

  // Populate Employee List
  document.c_teamMembers &&
    document.c_teamMembers.forEach((item: any) =>
      empList.push({
        "@type": "Person",
        name: item.name,
        jobTitle: item.fins_jobTitle,
        telephone: item.mainPhone,
        email: item.emails?.[0] ?? `capitalfins@capitalfins.com`,
      })
    );

  // Populate Blog List
  document.c_linkedInsightsArticles &&
    document.c_linkedInsightsArticles.forEach((item: any) =>
      blogsList.push({
        "@type": "BlogPosting",
        headline: item.name,
        datePublished: item.datePosted,
        author: {
          "@type": "Person",
          name: item.authorName ?? "Unknown Author",
        },
        url: `${windowProtocolHost}/${item.slug}`,
      })
    );

  // Populate FAQ List
  document.c_relatedFAQs &&
    document.c_relatedFAQs.forEach((item: any) =>
      faqsList.push({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })
    );

  return (
    <>
      <JsonLd<FinancialService>
        item={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          description,
          openingHoursSpecification: document.hours
            ? buildHoursSchema(document.hours)
            : "Mo,Tu,We,Th 09:00-12:00",
          telephone,
          url: windowUrl,
        }}
      />

      <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList,
        }}
      />

      <JsonLd<BlogPosting> item={blogsList} />

      {empList.length > 0 && <JsonLd<Person> item={empList} />}

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.geocodedCoordinate.latitude,
              longitude: document.geocodedCoordinate.longitude,
            },
          }}
        />
      )}
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const openingHours: any = [];
  Object.keys(hoursData).forEach(
    (day) =>
      hoursData[day].openIntervals &&
      openingHours.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day.substring(0, 2).replace(/./, (c) => c.toUpperCase()),
        opens: hoursData[day].openIntervals[0].start,
        closes: hoursData[day].openIntervals[0].end,
      })
  );
  return openingHours;
};

export default LocSchema;
