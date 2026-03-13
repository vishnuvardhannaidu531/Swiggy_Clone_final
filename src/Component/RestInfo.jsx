import { useState } from "react";
import { addItems, IncrementItems, DecrementItems } from "../Stored/CartSlicer";
import { useDispatch, useSelector } from "react-redux";

const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/";

function RestInfo({ restData }) {
  const items = useSelector((state) => state.cartslice.items);
  const element = items.find((item) => item.id === restData?.id);
  const count = element ? element.quantity : 0;
  const dispatch = useDispatch();

  if (!restData) return null;

  const price = restData?.defaultPrice
    ? restData.defaultPrice / 100
    : restData?.price / 100;

  return (
    <div className="flex items-start justify-between gap-3 py-4">
      {/* Left: Info */}
      <div className="flex-1 min-w-0">
        {/* Veg / Non-veg indicator */}
        <div className="mb-1">
          {restData?.isVeg ? (
            <span className="inline-block w-4 h-4 border-2 border-green-600 rounded-sm">
              <span className="block w-2 h-2 bg-green-600 rounded-full mx-auto mt-0.5"></span>
            </span>
          ) : (
            <span className="inline-block w-4 h-4 border-2 border-red-600 rounded-sm">
              <span className="block w-2 h-2 bg-red-600 rounded-full mx-auto mt-0.5"></span>
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
          {restData?.name}
        </p>

        <p className="text-sm font-medium text-gray-700 mt-0.5">
          ₹{price}
        </p>

        {restData?.ratings?.aggregatedRating?.rating && (
          <p className="text-xs text-green-600 font-medium mt-0.5">
            ⭐ {restData?.ratings?.aggregatedRating?.rating}{" "}
            <span className="text-gray-400">
              ({restData?.ratings?.aggregatedRating?.ratingCountV2})
            </span>
          </p>
        )}

        {restData?.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {restData?.description}
          </p>
        )}
      </div>

      {/* Right: Image + Add button */}
      <div className="relative flex-none w-24 sm:w-32">
        {restData?.imageId ? (
          <img
            className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-xl"
            src={imgUrl + restData?.imageId}
            alt={restData?.name}
          />
        ) : (
          <div className="w-24 h-20 sm:w-32 sm:h-24 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-300 text-3xl">🍽️</span>
          </div>
        )}

        {/* ADD / increment-decrement button */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {count === 0 ? (
            <button
              className="bg-white border border-green-500 text-green-600 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-xl shadow-md hover:bg-green-50 transition whitespace-nowrap"
              onClick={() => dispatch(addItems(restData))}
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-white border border-green-500 text-green-600 font-bold text-sm px-2 py-1 rounded-xl shadow-md">
              <button
                onClick={() => dispatch(DecrementItems(restData))}
                className="hover:text-red-500 transition px-1"
              >
                −
              </button>
              <span className="min-w-[16px] text-center">{count}</span>
              <button
                onClick={() => dispatch(IncrementItems(restData))}
                className="hover:text-green-700 transition px-1"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestInfo;
