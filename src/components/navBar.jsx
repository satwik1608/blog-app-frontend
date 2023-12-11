import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { useUser } from "./../userContext";
import { logout } from "../services/authService";
import { onePiece } from "../services/onePiece";
import { Navbar, Button } from "flowbite-react";
function NavBar() {
  const { id: user } = useUser();
  const handleLogout = () => {
    logout();
    window.location = "./";
  };
  function handleTheme() {
    var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    var themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );
    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      themeToggleLightIcon.classList.remove("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
    }
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  }
  const [activeItem, setActiveItem] = useState("home");
  return (
    <Navbar
      fluid={true}
      className=" waah px-2 sm:px-4 py-2.5 dark:bg-gray-900 bg-slate-300  fixed w-full z-20 top-0 left-0 border-b  border-gray-600"
    >
      <Navbar.Brand as={Link} to="/home">
        <img
          src={`data:image/png;base64,${onePiece}`}
          className="mr-3 h-6 sm:h-9"
          alt="Inkwell Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Inkwell
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!user && (
          <Link
            type="button"
            to={"/register"}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up / Login
          </Link>
        )}
        {user && (
          <button
            type="button"
            onClick={handleLogout}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logout
          </button>
        )}
        <Navbar.Toggle />
        <button
          id="theme-toggle"
          type="button"
          onClick={handleTheme}
          class="text-gray-500 ml-2 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
        >
          <svg
            id="theme-toggle-dark-icon"
            class="hidden w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            id="theme-toggle-light-icon"
            class=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <Navbar.Collapse className="lol flex content-center items-center">
        <Navbar.Link
          as={Link}
          to="/"
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
        >
          Home
        </Navbar.Link>
        {user && (
          <Navbar.Link
            as={Link}
            to="/new-blog"
            active={activeItem === "write"}
            onClick={() => setActiveItem("write")}
          >
            Write
          </Navbar.Link>
        )}
        {user && (
          <Navbar.Link
            as={Link}
            to={`/search`}
            active={activeItem === "search"}
            onClick={() => setActiveItem("search")}
          >
            Search
          </Navbar.Link>
        )}
        {user && (
          <Navbar.Link
            as={Link}
            to={`/author/${user._id}`}
            active={activeItem === "profile"}
            onClick={() => setActiveItem("profile")}
          >
            Profile
          </Navbar.Link>
        )}

        <Navbar.Link
          as={Link}
          to="/in-transit"
          active={activeItem === "services"}
          onClick={() => setActiveItem("services")}
        >
          Services
        </Navbar.Link>
        <Navbar.Link
          href="https://www.linkedin.com/in/satwikkashyap16/"
          target="_blank"
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
