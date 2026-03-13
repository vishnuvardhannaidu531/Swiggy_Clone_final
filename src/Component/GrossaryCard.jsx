const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/";

function GrossaryCard({ foodData }) {
  return (
    <div className="flex-none cursor-pointer hover:scale-105 transition duration-200">
      <a href={foodData?.action?.link}>
        <img
          className="w-24 h-28 sm:w-32 sm:h-36 object-cover rounded-2xl"
          src={imgUrl + foodData?.imageId}
          alt={foodData?.action?.text}
        />
        <p className="text-center text-xs sm:text-sm font-semibold mt-1 text-gray-700 w-24 sm:w-32 truncate">
          {foodData?.action?.text}
        </p>
      </a>
    </div>
  );
}

export default GrossaryCard;
