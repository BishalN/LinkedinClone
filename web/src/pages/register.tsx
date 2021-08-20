import React from "react";
import { HeroSvg } from "../components/HeroSvg";
import { Layout } from "../components/Layout";
import LogoSvg from "../components/LogoSvg";

const Register: React.FC = () => {
  return (
    <Layout>
      <nav className="flex mt-5 justify-between items-center">
        <LogoSvg />

        <div className="space-x-2 sm:space-x-10">
          {/* Ghost button */}
          <button
            className="text-gray-500
           hover:bg-gray-200 px-4 focus:ring-2 rounded-sm p-2 "
          >
            Join Now
          </button>
          {/* outlined button */}
          <button
            className="border-2 px-4 p-2 hover:bg-gray-100 focus:ring-2
            rounded-full border-blue-500"
          >
            Sign in
          </button>
        </div>
      </nav>

      <main className="mt-20">
        <h1 className="text-blue-500 text-5xl max-w-lg leading-snug">
          Welcome to your professional community
        </h1>

        <form
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="mt-10 flex flex-col space-y-5 max-w-md"
        >
          <input
            type="text"
            placeholder="Email address"
            className="border-2 p-3 border-gray-500 border-transparent focus:border-transparent
            focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-sm "
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 p-3 border-gray-500 border-transparent focus:border-transparent
            focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-sm "
          />

          <button
            type="submit"
            className="border-2 px-4 p-2 bg-blue-700 hover:bg-blue-900 text-white focus:ring-2
            rounded-2xl border-blue-500"
          >
            Sign in
          </button>
        </form>
      </main>
      {/* <div>
        <HeroSvg />
      </div> */}
    </Layout>
  );
};

export default Register;
