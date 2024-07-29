interface CtaProps {
  buttonText: string;
  style: "primary" | "secondary";
  url: string;
  classNames?: string;
}

const Cta = ({ buttonText, style, url, classNames = "" }: CtaProps) => {
  const styleClasses =
    style === "primary"
      ? "bg-primary text-white hover:bg-white hover:border-primary hover:text-primary w-fit hover:border"
      : "border-primary text-primary border border-primary hover:bg-primary hover:text-white  w-fit bg-white";

  return (
    <a
      href={url || "#"}
      className={`${styleClasses} ${classNames} `}
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
