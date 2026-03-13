import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchDishes, clearSearch } from "../Stored/MenuSlicer";

function SearchFood() {
  const { id } = useParams();
  const [food, setFood] = useState("");
  const dispatch = useDispatch();

  const { searchResults, searchStatus } = useSelector(
    (state) => state.menuSlice
  );

  useEffect(() => {
    // Clear old results when entering this page
    dispatch(clearSearch());
  }, []);

  useEffect(() => {
    if (food.length > 1) {
      dispatch(searchDishes({ restaurantId: id, query: food }));
    } else {
      dispatch(clearSearch());
    }
  }, [food, id, dispatch]);

  const loading = searchStatus === "loading";

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto mt-8 sm:mt-12 pb-16">
      {/* Search Input */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          
        </span>
        <input
          className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg bg-gray-100 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          placeholder="Search for dishes..."
          onChange={(e) => setFood(e.target.value)}
          value={food}
          autoFocus
        />
      </div>

      {/* Loading shimmer */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse bg-white rounded-xl p-4 shadow-sm">
              <div className="w-20 h-16 bg-gray-200 rounded-xl flex-none"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Idle hint */}
      {!loading && food.length <= 1 && (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-5xl mb-4"></p>
          <p className="text-base sm:text-lg">Type at least 2 characters to search</p>
        </div>
      )}

      {/* No results */}
      {!loading && food.length > 1 && Array.isArray(searchResults) && searchResults.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-5xl mb-4"></p>
          <p className="text-base sm:text-lg">No dishes found </p>
        </div>
      )}
    </div>
  );
}

export default SearchFood;
