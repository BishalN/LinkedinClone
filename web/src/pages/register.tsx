import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import LogoSvg from "../components/LogoSvg";

const login: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Layout>
        <main className="flex justify-center items-center flex-col h-screen space-y-5">
          <LogoSvg />
          <h1 className="text-3xl text-center">
            Make the most of your professional life
          </h1>

          <div className="bg-white h-auto py-7 w-full sm:w-8/12 xl:w-5/12 rounded-xl">
            <form className="w-full flex flex-col items-center justify-center h-full space-y-5">
              <Input
                type="text"
                placeholder="Email address"
                className="w-11/12 border-opacity-50"
              />
              <Input
                type="text"
                placeholder="Password"
                className="w-11/12  border-opacity-50"
              />
              <span className="text-center text-xs w-9/12">
                By clicking Agree & Join, you agree to the LinkedIn User
                Agreement, Privacy Policy, and Cookie Policy.
              </span>
              <Button variant="filled" className="w-1/2">
                Agree & Join
              </Button>
              <div className="w-full border-b-8"></div>
              <Button
                variant="outlined"
                className="w-11/12 text-lg text-blue-500"
                icon={<FcGoogle size={30} />}
              >
                Join with google
              </Button>
              <p>
                Already on linked in?{" "}
                <Link href="/login">
                  <span className="text-blue-500 cursor-pointer">Sign in?</span>
                </Link>
              </p>
            </form>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default login;
