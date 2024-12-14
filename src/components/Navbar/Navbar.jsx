import React from "react";
import { ModeToggle } from "../ThemeProvider/mode-toggle";
import MyNotificationsComponent from "../notification/Notifications";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4  ">
      <div className="text-xl font-bold">
        <a href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
          MyLogo
        </a>
      </div>

      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="#"
            className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
          >
            Contact
          </a>
        </li>
      </ul>
      <ModeToggle/>
      <MyNotificationsComponent/>
      {/* <button
        onClick={() => {
          document.documentElement.classList.toggle("dark");
        }}
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        Toggle Theme
      </button> */}
     
    </nav>
  );
}
export default Navbar;