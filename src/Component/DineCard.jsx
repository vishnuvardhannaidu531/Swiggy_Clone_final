const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/";

function DineCard({ RestData }) {
  return (
    <div className="flex-none cursor-pointer hover:scale-95 transition duration-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md">
      <a target="_blank" href={RestData?.cta?.link} className="block">
        <div className="relative w-48 sm:w-60 md:w-64">
          <img
            className="w-48 sm:w-60 md:w-64 h-36 sm:h-44 object-cover"
            src={imgUrl + RestData?.info?.mediaFiles[0]?.url}
            alt={RestData?.info?.name}
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent">
            <p className="absolute bottom-2 left-3 text-sm sm:text-base text-white font-semibold z-10 truncate max-w-[90%]">
              {RestData?.info?.name}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default DineCard;
