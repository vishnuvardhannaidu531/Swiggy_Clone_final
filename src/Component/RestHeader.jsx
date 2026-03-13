import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RestHeader() {
  const counter = useSelector((state) => state.cartslice.count);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="w-[90%] sm:w-[85%] mx-auto py-3 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <p className="text-orange-500 font-bold text-2xl sm:text-3xl font-serif">Swiggy</p>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 font-semibold text-base">
          <Link to="/restaurant" className="hover:text-orange-500 transition">Restaurants</Link>
          <Link to="/Checkout" className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition text-sm sm:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart ({counter})
          </Link>
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <Link to="/Checkout" className="relative text-orange-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {counter > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{counter}</span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-50 border-t px-6 py-3 flex flex-col gap-3 font-semibold text-gray-700">
          <Link to="/restaurant" className="py-2 border-b" onClick={() => setMenuOpen(false)}>Restaurants</Link>
          <Link to="/Checkout" className="py-2" onClick={() => setMenuOpen(false)}>Cart ({counter})</Link>
        </div>
      )}
    </div>
  );
}

export default RestHeader;
