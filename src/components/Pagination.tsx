import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

const Pagination = ({ nPages, currentPage, setCurrentPage }: any) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav className="mt-4 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1 text-primary">
        <a
          onClick={(e) => {
            e.preventDefault();
            goToPrevPage();
          }}
          className={`${
            currentPage === 1
              ? `pointer-events-none opacity-55`
              : `opacity-100  cursor-pointer`
          } inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium hover:border-primary`}
        >
          <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5" />
          Previous
        </a>
      </div>
      <ul className="hidden md:-mt-px md:flex">
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${
              currentPage === pgNumber
                ? " border-t-primary text-primary border-t-4 cursor-default"
                : "border-t-4 text-gray-300  border-transparent hover:border-gray-300 hover:text-primary  cursor-pointer"
            } `}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(pgNumber);
              }}
              className="inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium  "
            >
              {pgNumber}
            </a>
          </li>
        ))}
      </ul>
      <div className="-mt-px flex w-0 flex-1 justify-end text-primary">
        <a
          onClick={(e) => {
            e.preventDefault();
            goToNextPage();
          }}
          className={`${
            currentPage === pageNumbers.length
              ? `pointer-events-none opacity-55`
              : `opacity-100  cursor-pointer`
          } inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium hover:border-primary`}
        >
          Next
          <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5" />
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
