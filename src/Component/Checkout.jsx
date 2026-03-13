import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItems, IncrementItems, DecrementItems } from "../Stored/CartSlicer";

function Checkout() {
  const items = useSelector((state) => state.cartslice.items);
  const dispatch = useDispatch();

  const imgUrl = "https://media-assets.swiggy.com/swiggy/image/upload/";

  const total = items.reduce((acc, item) => {
    const price = item?.defaultPrice ? item.defaultPrice / 100 : item?.price / 100;
    return acc + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl sm:text-8xl mb-4">🛒</p>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-400 text-sm sm:text-base mb-6">
          Add items from a restaurant to get started
        </p>
        <Link
          to="/restaurant"
          className="bg-orange-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-orange-600 transition"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[60%] mx-auto py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {items.map((item) => {
          const price = item?.defaultPrice
            ? item.defaultPrice / 100
            : item?.price / 100;

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              {/* Image */}
              {item?.imageId ? (
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-none"
                  src={imgUrl + item.imageId}
                  alt={item.name}
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-none">
                  <span className="text-2xl">🍽️</span>
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {item.name}
                </p>
                <p className="text-orange-500 font-medium text-sm mt-0.5">
                  ₹{(price * item.quantity).toFixed(2)}
                </p>
                <p className="text-gray-400 text-xs">₹{price} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 border border-green-500 text-green-600 font-bold text-sm px-3 py-1.5 rounded-xl bg-white flex-none ">
                <button
                  onClick={() => dispatch(DecrementItems(item))}
                  className="hover:text-red-500 transition text-lg leading-none cursor-pointer"
                >
                  −
                </button>
                <span className="min-w-[20px] text-center">{item.quantity}</span>
                <button
                  onClick={() => dispatch(IncrementItems(item))}
                  className="hover:text-green-700 transition text-lg leading-none cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm sm:text-base text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Charges</span>
            <span>₹{(total * 0.05).toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-base sm:text-lg text-gray-800">
          <span>Total</span>
          <span>₹{(total + total * 0.05).toFixed(2)}</span>
        </div>

        <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 transition text-white font-bold py-3 sm:py-4 rounded-2xl text-base sm:text-lg">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
