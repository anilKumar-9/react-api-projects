import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchApi = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomjokes",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result?.data?.data || []);
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
  }, []);

  const nextJoke = () => {
    if (data.length === 0) return;
    setIndex((prev) => (prev + 1) % data.length);
  };

  const prevJoke = () => {
    if (data.length === 0) return;
    setIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const randomJoke = () => {
    if (data.length === 0) return;
    const random = Math.floor(Math.random() * data.length);
    setIndex(random);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950 text-white text-xl">
        Loading jokes...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950 text-red-500 text-xl">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Jokes Viewer
      </h1>

      {/* Card */}
      <div className="w-full max-w-xl bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-6 text-center">
        {/* Joke */}
        <p className="text-gray-200 text-lg leading-relaxed min-h-[100px]">
          {data.length > 0 ? data[index].content : "No jokes available"}
        </p>

        {/* Category */}
        {data.length > 0 && data[index].categories.length > 0 && (
          <span className="inline-block mt-4 text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">
            {data[index].categories[0]}
          </span>
        )}

        {/* Counter */}
        {data.length > 0 && (
          <p className="text-gray-400 text-sm mt-4">
            {index + 1} / {data.length}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <button
            onClick={prevJoke}
            className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 active:scale-95 transition"
          >
            Prev
          </button>

          <button
            onClick={randomJoke}
            className="px-5 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:scale-105 active:scale-95 transition"
          >
            Random
          </button>

          <button
            onClick={nextJoke}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 active:scale-95 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-6">Powered by FreeAPI</p>
    </div>
  );
}

export default App;
