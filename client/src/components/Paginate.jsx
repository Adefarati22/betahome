export default function Paginate({
  totalPages,
  hasMore,
  handlePageChange,
  currentPage,
}) {
  return (
    <div className="md:flex justify-center md:justify-between items-center py-4">
      <p className="hidden md:block text-green-500 font-semibold">
        Showing page {currentPage} of {totalPages} pages
      </p>
      <div className="join bg-white border border-slate-200 rounded-lg">
        <button
          onClick={() => handlePageChange("first")}
          className={`join-item btn ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button
          onClick={() => handlePageChange("prev")}
          className={`join-item py-2 px-4  bg-white text-black hover:text-white hover:bg-green-500 transition-all duration-300 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
          disabled={currentPage === 1}
        >
          prev
        </button>
        <button className="join-item py-2 px-4 bg-green-500 text-white">
          {currentPage}
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className={`join-item py-2 px-4 text-zinc-800 ${
            !hasMore ? "cursor-not-allowed opacity-50" : "cursor-pointer  bg-white text-black hover:text-white hover:bg-green-500 transition-all duration-300"
          }`}
          disabled={!hasMore}
        >
          next
        </button>
        <button
          onClick={() => handlePageChange("last")}
          className={`join-item py-2 px-4 ${
            !hasMore ? "cursor-not-allowed opacity-50" : "cursor-pointer bg-black text-white hover:text-white hover:bg-green-500 transition-all duration-300"
          }`}
          disabled={!hasMore}
        >
          »
        </button>
      </div>
    </div>
  );
}
