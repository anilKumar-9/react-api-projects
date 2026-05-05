import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

const LIMIT = 10;

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 Fetch with pagination
  useEffect(() => {
    const controller = new AbortController();

    const fetchApi = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=${LIMIT}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        setData(result?.data?.data || []);
        setTotalPages(result?.data?.totalPages || 1);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApi();

    return () => controller.abort();
  }, [page]);

  const nextPage = () => {
    if (!loading && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (!loading && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  // 🔥 Smart pagination
  const getPages = () => {
    const pages = [];
    const delta = 2;

    const left = Math.max(1, page - delta);
    const right = Math.min(totalPages, page + delta);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center py-6">Random Users 👥</h1>

      {/* Error */}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-10">
        {data.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-400 mb-4">Loading...</p>}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pb-10 flex-wrap">
        {/* Prev */}
        <button
          onClick={prevPage}
          disabled={page === 1 || loading}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
        >
          Prev
        </button>

        {/* Pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              disabled={loading}
              className={`px-3 py-1 rounded ${
                p === page
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={nextPage}
          disabled={page === totalPages || loading}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 pb-6">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}

export default App;
