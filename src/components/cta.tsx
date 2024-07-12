interface CtaProps {
  buttonText: string;
  style: "primary" | "secondary";
  url: string;
  classNames?: string;
}

const Cta = ({ buttonText, style, url, classNames = "" }: CtaProps) => {
  const styleClasses =
    style === "primary"
      ? "bg-primary text-white w-fit"
      : "border-primary text-primary border w-fit";

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
