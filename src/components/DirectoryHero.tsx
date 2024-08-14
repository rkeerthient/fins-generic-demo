export interface DirectoryHeroProps {
  pageTitle: string;
  description?: string;
}

const DirectoryHero = ({ pageTitle, description }: DirectoryHeroProps) => {
  return (
    <section className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
      <h1 className="sr-only">Directory Header</h1>
      <article className="absolute inset-0 overflow-hidden">
        <img
          src="https://a.mktgcdn.com/p/Kv4KDWsSWCn3y_x5VSRTLyN_AwatVuWE-Dp8ZSq0Z-w/1200x796.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </article>
      <article
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-70"
      />
      <section className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-white">{pageTitle}</h2>
        <p className="mt-3 text-lg md:text-xl text-white">
          {description ||
            `Explore a world of banking solutions, from accounts and loans to investment insights. We're committed to your financial success, providing secure, user-friendly access to our services. Discover your path to a brighter financial future right here.`}
        </p>
      </section>
    </section>
  );
};

export default DirectoryHero;
