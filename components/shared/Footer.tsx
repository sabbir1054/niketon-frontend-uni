/* eslint-disable @next/next/no-img-element */
import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D1224] text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
        {/* Get Our App Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Get Our App</h3>
          <p>Download the app and book your property</p>
          <div className="flex space-x-2">
            <img
              src="/images/google-pay.webp"
              alt="Google Play"
              className=""
              width={130}
              height={40}
            />
            <img
              src="/images/app-store.webp "
              alt="App Store"
              width={130}
              height={40}
            />
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 mt-2">
            {["Listings", "Register", "Login", "Blogs", "Agency"].map(
              (item) => (
                <li key={item} className="hover:text-gray-400 cursor-pointer">
                  ➤ {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold">Categories</h3>
          <ul className="space-y-2 mt-2">
            {["Apartments", "Home", "Office", "Villas", "Flat"].map((item) => (
              <li key={item} className="hover:text-gray-400 cursor-pointer">
                ➤ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="text-lg font-semibold">Locations</h3>
          <ul className="space-y-2 mt-2">
            {["United States", "Canada", "India", "UK", "Australia"].map(
              (item) => (
                <li key={item} className="hover:text-gray-400 cursor-pointer">
                  ➤ {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 mt-2">
            {[
              "About",
              "Faq",
              "Terms & Conditions",
              "Privacy Policy",
              "Gallery",
            ].map((item) => (
              <li key={item} className="hover:text-gray-400 cursor-pointer">
                ➤ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col items-center space-y-4 text-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {[Facebook, Twitter, Linkedin].map((Icon, index) => (
            <Icon
              key={index}
              className="text-white bg-gray-800 p-2 rounded-full text-2xl w-10 h-10 cursor-pointer hover:bg-gray-600"
            />
          ))}
        </div>

        <p className="text-sm">Copyright 202 - All rights reserved Niketon</p>
      </div>
    </footer>
  );
}
