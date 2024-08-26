import { JsonLd } from "react-schemaorg";
import { ClothingStore, FAQPage, Place, ItemList, Person } from "schema-dts";
const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name} in ${document.address.city}, ${document.address.region}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.decription;
  const faqsList: any = [];
  const productsList: any = [];
  const itemListElement: any = [];

  return (
    <>
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
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
          knowsAbout: document.fins_relatedServices.map(
            (value: any) => value.key
          ),
          telephone,
          knowsLanguage: document.languages,
          image: document.headshot,
          url: window.location.href,
          affiliation: {
            "@type": "Organization",
            name: "Capital fins bank",
            url: window.location.protocol + "//" + window.location.host,
          },
        }}
      />

      {/*  <JsonLd<FAQPage>
        item={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqsList,
        }}
      /> */}

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            openingHoursSpecification: buildHoursSchema(document.hours),
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
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
