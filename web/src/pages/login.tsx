import { useRouter } from "next/dist/client/router";
import React from "react";
import { Button } from "../components/Button";
import { HeroSvg } from "../components/HeroSvg";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import LogoSvg from "../components/LogoSvg";

const Register: React.FC = () => {
  const router = useRouter();
  return (
    <Layout>
      <nav className="flex mt-5 justify-between items-center ">
        <LogoSvg />
        <div className="flex space-x-2 sm:space-x-10">
          <Button variant="ghost" onClick={() => router.push("/register")}>
            Join Now
          </Button>
          <Button variant="outlined">Sign in</Button>
        </div>
      </nav>

      <main className="mt-20 flex">
        <section id="Login">
          <h1 className="text-blue-500 text-5xl max-w-lg leading-snug">
            Welcome to your professional community
          </h1>

          <form
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="mt-10 flex flex-col space-y-5 max-w-md"
          >
            <Input type="text" placeholder="Email address" />
            <Input type="password" placeholder="Password" />

            <Button variant="filled" type="submit">
              Sign in
            </Button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default Register;
