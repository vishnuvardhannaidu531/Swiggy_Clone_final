import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "../Stored/MenuSlicer";
import MenuCard from "./MenuCard";

function RestaurantMenu() {
  const [Selected, setSelected] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { menus, menuStatus, menuError } = useSelector(
    (state) => state.menuSlice
  );

  // Data for this specific restaurant (may already be cached)
  const RestData = menus[id] || [];

  useEffect(() => {
    // Only fetch if not already cached for this restaurant
    if (!menus[id]) {
      dispatch(fetchMenu(id));
    }
  }, [id, dispatch]);

  if (menuStatus === "loading" && !menus[id]) {
    return (
      <div className="w-[90%] sm:w-[80%] mx-auto mt-10 animate-pulse space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (menuStatus === "failed") {
    return (
      <div className="w-[90%] sm:w-[80%] mx-auto mt-16 text-center">
        <p className="text-4xl mb-3"></p>
        <p className="text-lg font-semibold text-gray-600">Failed to load menu</p>
        <p className="text-sm text-gray-400 mt-1">{menuError}</p>
        <button
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600 transition"
          onClick={() => dispatch(fetchMenu(id))}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-[80%] mx-auto pb-16">
      {/* Search for Dishes */}
      <div className="mt-8 sm:mt-12 mb-6">
        <Link to={`/city/mumbai/${id}/search`}>
          <p className="w-full text-center py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition text-base sm:text-xl font-medium text-gray-600 border border-gray-200">
             Search for Dishes
          </p>
        </Link>
      </div>

      {/* Veg / Non-Veg Filters */}
      <div className="flex gap-3 mb-8 flex-wrap">
        <button
          className={`text-sm sm:text-base py-2 px-5 border rounded-2xl font-semibold transition cursor-pointer ${
            Selected === "veg"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
          }`}
          onClick={() => setSelected(Selected === "veg" ? null : "veg")}
        >
           Veg
        </button>
        <button
          className={`text-sm sm:text-base py-2 px-5 border rounded-2xl font-semibold transition cursor-pointer ${
            Selected === "nonveg"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 border-gray-300 hover:border-red-500"
          }`}
          onClick={() => setSelected(Selected === "nonveg" ? null : "nonveg")}
        >
           Non Veg
        </button>
      </div>

      {/* Menu Categories */}
      <div className="space-y-2">
        {RestData.map((menuItems) => (
          <MenuCard
            key={menuItems?.card?.card?.title}
            menuItems={menuItems?.card?.card}
            foodSelected={Selected}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;
