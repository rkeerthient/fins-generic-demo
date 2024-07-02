type Cta = {
  buttonText: string;
  url: string;
  style?: "primary" | "secondary";
};

const Cta = (props: Cta) => {
  const { buttonText, url, style } = props;

  return (
    <a
      href={url}
      className={` ${style === "primary" ? `w-fit px-2 py-1.5 md:px-6 md:py-2.5 text-sm md:text-base bg-primary text-white rounded-md ` : ``}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
