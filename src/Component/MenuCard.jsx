import { useState } from "react";
import RestInfo from "./RestInfo";

function MenuCard({ menuItems, foodSelected }) {
  const [isOpen, setIsOpen] = useState(true);

  // Nested category (has sub-categories)
  if (menuItems && "categories" in menuItems) {
    return (
      <div className="w-full mb-2">
        <p className="text-base sm:text-lg font-bold text-gray-500 uppercase tracking-wide px-1 mb-2">
          {menuItems.title}
        </p>
        <div>
          {menuItems?.categories?.map((items) => (
            <MenuCard key={items?.title} menuItems={items} foodSelected={foodSelected} />
          ))}
        </div>
      </div>
    );
  }

  const getFilteredItems = () => {
    if (!menuItems?.itemCards) return [];
    if (foodSelected === "veg")
      return menuItems.itemCards.filter((food) => "isVeg" in food?.card?.info);
    if (foodSelected === "nonveg")
      return menuItems.itemCards.filter((food) => !("isVeg" in food?.card?.info));
    return menuItems.itemCards;
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-3">
      {/* Category Header */}
      <button
        className="w-full flex justify-between items-center px-4 sm:px-6 py-4 hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-base sm:text-xl font-bold text-gray-800 text-left">
          {menuItems?.title}
          <span className="text-gray-400 font-normal text-sm ml-2">
            ({filteredItems.length})
          </span>
        </p>
        <span className="text-gray-500 text-xl">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Items */}
      {isOpen && (
        <div className="px-4 sm:px-6 pb-4 divide-y divide-gray-100">
          {filteredItems.length > 0 ? (
            filteredItems.map((items) => (
              <RestInfo key={items?.card?.info?.id} restData={items?.card?.info} />
            ))
          ) : (
            <p className="text-gray-400 text-sm py-4 text-center">
              No items in this category for the selected filter.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuCard;
