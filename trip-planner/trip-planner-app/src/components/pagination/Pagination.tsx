import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
  } from "@heroicons/react/24/solid";
  import PaginationButton from "./PaginationButton";
  import PaginationItem from "./PaginationItem";
  
  interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
  }
  
  const Pagination = ({
    itemsPerPage,
    totalItems,
    currentPage,
    paginate,
  }: PaginationProps) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const handleClick = (pageNumber: number) => {
      paginate(pageNumber);
    };
  
    const handleFirstPage = () => {
      paginate(1);
    };
  
    const handleLastPage = () => {
      paginate(pageNumbers.length);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        paginate(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        paginate(currentPage + 1);
      }
    };
  
    return (
      <nav className="flex justify-center items-center space-x-1 sm:space-x-2">
        <PaginationButton onClick={handleFirstPage} disabled={currentPage === 1}>
          <ChevronDoubleLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </PaginationButton>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </PaginationButton>
        <ul className="flex space-x-1 sm:space-x-2 overflow-x-auto">
          {pageNumbers.map((number) => (
            <PaginationItem
              key={number}
              pageNumber={number}
              currentPage={currentPage}
              onClick={handleClick}
            />
          ))}
        </ul>
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </PaginationButton>
        <PaginationButton
          onClick={handleLastPage}
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronDoubleRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </PaginationButton>
      </nav>
    );
  };
  
  export default Pagination;
  