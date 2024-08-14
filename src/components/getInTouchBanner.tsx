import Cta from "./cta";
const getInTouchBanner = () => {
  return (
    <section
      aria-label="Hero section"
      className="w-full h-[200px] md:h-[500px] relative"
    >
      <h2 className="sr-only">Hero section</h2>

      <img
        src="https://a.mktgcdn.com/p/sen0TdAb2xKxTvNWohNCdkYJE4HDF2yzHAYZHSYjTJk/1660x625.jpg"
        alt=""
        className="!w-full !absolute h-[200px] md:h-full !max-w-none"
      />
      <article className=" w-full absolute bg-black bg-opacity-75 flex items-center justify-center flex-col h-[200px] md:h-full text-white top-0 left-0 z-2">
        <section className="md:p-8 md:ml-16 justify-center  w-full  flex  gap-4 md:gap-4 mx-6 my-12 p-4   text-white items-center">
          <img
            src="https://a.mktgcdn.com/p/JUivhtB3rL5IfY4Vv86lmCinXDSswh1MGCMoy8_LXvQ/2336x2336.png"
            alt=""
            className="!w-52 rounded-full aspect-square  !h-auto hidden  md:block"
          />
          <article className="flex flex-col gap-2 text-base">
            <h2 className="text-white">Get in touch with our Wealth expert</h2>
            <p>Wealth Management Financial Advisor</p>

            <Cta
              buttonText={"Get In Touch"}
              style={"primary"}
              url={""}
              classNames=" w-fit px-2 py-1.5 md:px-4 md:py-2  text-sm md:text-base rounded-md mt-4"
            />
          </article>
        </section>
      </article>
    </section>
  );
};

export default getInTouchBanner;
