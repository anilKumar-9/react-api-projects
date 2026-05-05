import { useEffect, useState } from "react";

const LIMIT = 10;

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch jokes
  useEffect(() => {
    const controller = new AbortController();

    const fetchJokes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.freeapi.app/api/v1/public/randomjokes?page=${page}&limit=${LIMIT}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();

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

    fetchJokes();
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

const getPages = () => {
  const pages = [];
  const delta = 2;

  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  // Always include first page
  pages.push(1);

  // Left dots
  if (left > 2) {
    pages.push("...");
  }

  // Middle pages
  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  // Right dots
  if (right < totalPages - 1) {
    pages.push("...");
  }

  // Always include last page (if more than 1)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

  const pages = getPages();

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl text-center mb-6">Random Jokes</h1>

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Jokes */}
      <div className="max-w-2xl mx-auto space-y-4">
        {data.length === 0 && !loading && (
          <p className="text-center text-gray-400">No jokes found</p>
        )}

        {data.map((joke) => {
          const category =
            joke.categories.length > 0 ? joke.categories[0] : "random";

          return (
            <div
              key={joke.id}
              className="p-4 bg-gray-900 rounded border border-gray-800"
            >
              <p>{joke.content}</p>

              <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                {category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Loading */}
      {loading && <p className="text-center mt-4 text-gray-400">Loading...</p>}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        {/* Prev */}
        <button
          onClick={prevPage}
          disabled={page === 1 || loading}
          className="px-3 py-1 bg-gray-800 rounded disabled:opacity-40"
        >
          Prev
        </button>

        {/* Page Numbers */}
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
      <p className="text-center text-gray-500 mt-6">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}
