import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#ff5200] font-serif">
      {/* Navbar */}
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <img
          className="w-28 h-9 sm:w-36 sm:h-11 object-contain"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/static-assets/images/swiggy_logo_white.png"
          alt="Swiggy Logo"
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex font-serif text-white text-sm lg:text-base font-bold gap-4 lg:gap-8 items-center">
          <a target="_blank" href="https://www.swiggy.com/corporate/" className="hover:opacity-80 transition">
            Swiggy Corporate
          </a>
          <a target="_blank" href="https://partner.swiggy.com/login#/swiggy" className="hover:opacity-80 transition">
            Partner with Us
          </a>
          <a className="border border-white py-2 px-3 rounded-2xl hover:bg-white hover:text-[#ff5200] transition" target="_blank" href="#">
            Get the App
          </a>
          <a className="border border-black bg-black py-2 px-3 rounded-2xl hover:bg-gray-800 transition" target="_blank" href="#">
            Sign in
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#e04900] px-6 pb-4 flex flex-col gap-3 text-white font-bold text-base">
          <a target="_blank" href="https://www.swiggy.com/corporate/" className="py-2 border-b border-orange-400">Swiggy Corporate</a>
          <a target="_blank" href="https://partner.swiggy.com/login#/swiggy" className="py-2 border-b border-orange-400">Partner with Us</a>
          <a target="_blank" href="#" className="py-2 border-b border-orange-400">Get the App</a>
          <a target="_blank" href="#" className="py-2">Sign in</a>
        </div>
      )}

      {/* Hero Section */}
      <div className="pt-10 pb-8 relative overflow-hidden">
        <img className="hidden lg:block h-72 xl:h-96 w-44 xl:w-56 absolute top-0 left-0 object-contain" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png" alt="" />
        <img className="hidden lg:block h-72 xl:h-96 w-44 xl:w-56 absolute top-0 right-0 object-contain" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png" alt="" />

        <div className="max-w-[90%] sm:max-w-[75%] lg:max-w-[55%] text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-bold mx-auto text-center">
          Order Food and groceries. Discover best restaurants. Swiggy it!
        </div>

        <div className="max-w-[90%] sm:max-w-[80%] lg:max-w-[65%] mx-auto flex flex-col sm:flex-row gap-3 mt-6">
          <input className="bg-white w-full sm:w-[38%] text-base sm:text-lg px-4 py-3 rounded-2xl placeholder-gray-500 focus:outline-none" type="text" placeholder="Delhi, India" />
          <input className="bg-white w-full sm:w-[62%] text-base sm:text-lg px-4 py-3 rounded-2xl placeholder-gray-500 focus:outline-none" type="text" placeholder="Search for restaurant, item or more" />
        </div>
      </div>

      {/* Banner Cards */}
      <div className="max-w-[90%] sm:max-w-[85%] mx-auto flex flex-col sm:flex-row justify-center gap-3 pb-4">
        <Link to="/restaurant" className="flex-1">
          <img className="w-full rounded-xl object-cover" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/ec86a309-9b06-48e2-9adc-35753f06bc0a_Food3BU.png" alt="Restaurants" />
        </Link>
        <a href="https://www.swiggy.com/instamart?entryId=1234&entryName=mainTileEntry4&v=1" className="flex-1">
          <img className="w-full rounded-xl object-cover" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b5c57bbf-df54-4dad-95d1-62e3a7a8424d_IM3BU.png" alt="Instamart" />
        </a>
        <a href="https://www.swiggy.com/dineout" className="flex-1">
          <img className="w-full rounded-xl object-cover" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/23/b6d9b7ab-91c7-4f72-9bf2-fcd4ceec3537_DO3BU.png" alt="Dineout" />
        </a>
      </div>
    </header>
  );
}

export default Header;
