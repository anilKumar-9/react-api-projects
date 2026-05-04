import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchApi = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomusers",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.data.data);
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

  if (loading) return <h1 className="text-center mt-10 text-xl">Loading...</h1>;

  if (error)
    return <h1 className="text-center mt-10 text-red-500">Error: {error}</h1>;

return (
  <div className="min-h-screen bg-gray-950 text-white">
    {/* Header */}
    <h1 className="text-3xl font-bold text-center py-6">Random Users 👥</h1>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-10">
      {data.map((user) => (
        <UserCard key={user.login.uuid} user={user} />
      ))}
    </div>
  </div>
);
}

export default App;
