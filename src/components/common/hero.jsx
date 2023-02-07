import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section class="bg-white dark:bg-gray-800">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl  dark:text-slate-100">
            Hi there!
          </h1>
          <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            To get started click on button below
          </p>
          <p class="mb-4 text-lg font-light  dark:text-gray-400">
            Make sure to write some good blogs :)
          </p>
          <Link
            to="/register"
            class="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-slate-100 dark:focus:ring-primary-900 my-4"
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
