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
          <button className="text-gray-500 hover:bg-gray-200 px-4 focus:ring-2 rounded-sm p-2">
            Join Now
          </button>
          {/* outlined button */}
          <button className="border-2 px-4 p-2 hover:bg-gray-100 focus:ring-2  rounded-full border-blue-500">
            Sign in{" "}
          </button>
        </div>
      </nav>

      <main className="mt-20">
        <h1 className="text-blue-500 text-5xl max-w-lg leading-snug">
          Welcome to your professional community
        </h1>

        <form>
          <input
            type="text"
            placeholder="email address"
            className="border-2 p-2 border-gray-600"
          />
        </form>
      </main>
      {/* <div>
        <HeroSvg />
      </div> */}
    </Layout>
  );
};

export default Register;
