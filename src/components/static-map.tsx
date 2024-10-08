type Coordinates = {
  latitude: string;
  longitude: string;
};

const StaticMap = (props: Coordinates) => {
  const { latitude, longitude } = props;

  return (
    <>
      <img
        alt="Map block"
        loading="lazy"
        className="w-full md:w-[45%]"
        width="300"
        height="200"
        src={
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          `${latitude}` +
          "," +
          `${longitude}` +
          "&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C" +
          `${latitude}` +
          "," +
          `${longitude}` +
          `&key=${import.meta.env.YEXT_PUBLIC_GOOGLE_KEY}`
        }
      ></img>
    </>
  );
};

export default StaticMap;
