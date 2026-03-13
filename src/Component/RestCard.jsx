import { Link } from "react-router-dom";

const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/";

function RestCard({ restInfo }) {
  return (
    <Link to={`/city/mumbai/${restInfo?.info?.id}`}>
      <div className="cursor-pointer hover:scale-95 transition duration-200 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md">
        <div className="relative">
          <img
            className="w-full h-36 sm:h-40 object-cover"
            src={imgUrl + restInfo?.info?.cloudinaryImageId}
            alt="Restaurant"
          />
          {/* Discount badge if available */}
          {restInfo?.info?.aggregatedDiscountInfoV3?.header && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to from-black/70 to-transparent px-3 py-2">
              <p className="text-white text-xs font-bold">
                {restInfo?.info?.aggregatedDiscountInfoV3?.header}{" "}
                {restInfo?.info?.aggregatedDiscountInfoV3?.subHeader}
              </p>
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="font-bold text-sm sm:text-base text-gray-800 truncate">
            {restInfo?.info?.name}
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm mt-1 text-gray-600">
            <span className="text-green-600 font-semibold">⭐ {restInfo?.info?.avgRating}</span>
            <span>•</span>
            <span>{restInfo?.info?.sla?.slaString}</span>
          </div>

          <div className="text-gray-400 text-xs mt-1 truncate">
            {restInfo?.info?.cuisines?.join(", ")}
          </div>

          {restInfo?.info?.costForTwo && (
            <div className="text-gray-500 text-xs mt-1">{restInfo?.info?.costForTwo}</div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default RestCard;
