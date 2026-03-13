import FoodData from "./FoodData";
import FoodCard from "./FoodCard";

function FoodOption() {
  return (
    <div className="w-[90%] sm:w-[85%] mx-auto mt-10 sm:mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">What's on your mind?</h2>
      <div className="flex overflow-x-auto gap-3 sm:gap-5 pb-2 scrollbar-hide">
        {FoodData.map((item) => (
          <FoodCard key={item.id} foodData={item} />
        ))}
      </div>
    </div>
  );
}

export default FoodOption;
