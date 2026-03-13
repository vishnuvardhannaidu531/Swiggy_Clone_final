import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../Stored/RestaurantSlicer";
import RestCard from "./RestCard";
import Shimmer from "./Shimmer";

function Restaurant() {
  const dispatch = useDispatch();
  const { restaurants, status, error } = useSelector(
    (state) => state.restaurantSlice
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Only fetch if not already loaded — avoids redundant API calls
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [status, dispatch]);


  if (status === "loading") return <Shimmer />;

  if (status === "failed") {
    return (
      <div className="w-[90%] sm:w-[88%] mx-auto mt-16 text-center">
        <p className="text-4xl mb-3"></p>
        <p className="text-lg font-semibold text-gray-600">Failed to load restaurants</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
        <button
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition cursor-pointer"
          onClick={() => dispatch(fetchRestaurants())}
        >
          Retry
        </button>
      </div>
    );
  }

  const filtered = searchTerm
    ? restaurants.filter((item) =>
        item.info.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : restaurants;
  console.log(filtered);
  return (
    <div className="w-[90%] sm:w-[88%] mx-auto mt-6 sm:mt-10 mb-10">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Restaurants near you
          <span className="text-sm font-normal text-gray-400 ml-2">
            ({filtered.length} restaurants)
          </span>
        </h2>
        <input
          className="w-full sm:w-64 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          type="text"
          placeholder="Filter restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((item) => (
          <RestCard key={item.info.id} restInfo={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-lg">
          No restaurants found for "{searchTerm}"
        </p>
      )}
    </div>
  );
}

export default Restaurant;
