interface PaginationItemProps {
  pageNumber: number;
  currentPage: number;
  onClick: (pageNumber: number) => void;
}

const PaginationItem = ({
  pageNumber,
  currentPage,
  onClick,
}: PaginationItemProps) => {
  const isActive = currentPage === pageNumber;
  return (
    <li>
      <button
        onClick={() => onClick(pageNumber)}
        className={`p-2 rounded-full transition-colors ${
          isActive
            ? "bg-gradient-to-br from-green-700 to-green-500 text-white"
            : "bg-white text-green-500 hover:bg-gray-200"
        }`}
        style={{
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pageNumber}
      </button>
    </li>
  );
};

export default PaginationItem;
