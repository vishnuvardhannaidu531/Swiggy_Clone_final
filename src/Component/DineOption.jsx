import dineoutRestaurants from "../Utils/DineData";
import DineCard from "./DineCard";

function DineOption() {
  return (
    <div className="w-[90%] sm:w-[85%] mx-auto mt-10 sm:mt-16 mb-16">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Discover best restaurants on Dineout
      </h2>
      <div className="flex flex-nowrap overflow-x-auto gap-3 sm:gap-5 pb-3 scrollbar-hide">
        {dineoutRestaurants.map((RestData) => (
          <DineCard key={RestData?.info?.id} RestData={RestData} />
        ))}
      </div>
    </div>
  );
}

export default DineOption;
