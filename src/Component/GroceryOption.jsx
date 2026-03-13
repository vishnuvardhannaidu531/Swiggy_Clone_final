import GroceryCards from "../Utils/Grocery";
import GrossaryCard from "./GrossaryCard";

function GroceryOption() {
  return (
    <div className="w-[90%] sm:w-[85%] mx-auto mt-10 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Shop Groceries on Instamart</h2>
      <div className="flex flex-nowrap overflow-x-auto gap-3 sm:gap-5 pb-2 scrollbar-hide">
        {GroceryCards.map((foodData) => (
          <GrossaryCard key={foodData.id} foodData={foodData} />
        ))}
      </div>
    </div>
  );
}

export default GroceryOption;
