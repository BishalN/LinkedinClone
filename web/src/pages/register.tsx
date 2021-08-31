import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import LogoSvg from "../components/LogoSvg";
import { useState } from "react";
import firebase from "../utils/initFirebase";
import { Alert } from "../components/Alert";
import { useRouter } from "next/dist/client/router";
import { userPostRegisterActions } from "../utils/userPostRegister";

const register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ code: "", message: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleGoogleRegister = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (value) => {
        await userPostRegisterActions(value);

        if (router.query.next === "string") {
          router.push(router.query.next);
        } else {
          router.push(`/`);
        }
      })
      .catch((err) => setError(err));

    //use this when on mobile
    // firebase.auth().signInWithRedirect(provider);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    //reset the error State
    setError({ code: "", message: "" });

    if (email.length === 0) {
      setLoading(false);
      return setError({ code: "email/required", message: "Email is required" });
    } else if (password.length === 0) {
      setLoading(false);
      return setError({
        code: "password/required",
        message: "Password is required",
      });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        await userPostRegisterActions(value);
        setLoading(false);
        if (router.query.next === "string") {
          router.push(router.query.next);
        } else {
          router.push(`/`);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setEmail("");
        setPassword("");
      });
  };
  return (
    <div className="bg-gray-100">
      <Layout>
        <main className="flex justify-center items-center flex-col h-screen space-y-5">
          <LogoSvg />
          <h1 className="text-3xl text-center">
            Make the most of your professional life
          </h1>

          <div className="bg-white h-auto py-7 w-full sm:w-8/12 xl:w-5/12 rounded-xl">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center justify-center h-full space-y-5"
            >
              {error.message.length > 0 && (
                <Alert
                  variant="failure"
                  message={error.message}
                  className="self-start ml-3"
                />
              )}
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-11/12 border-opacity-50"
              />
              <Input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-11/12  border-opacity-50"
              />
              <span className="text-center text-xs w-9/12">
                By clicking Agree & Join, you agree to the LinkedIn User
                Agreement, Privacy Policy, and Cookie Policy.
              </span>
              <Button
                type="submit"
                variant="filled"
                className="w-1/2"
                loading={loading}
              >
                Agree & Join
              </Button>
              <div className="w-full border-b-8"></div>
              <Button
                variant="outlined"
                type="button"
                className="w-11/12 text-lg text-blue-500"
                icon={<FcGoogle size={30} />}
                onClick={handleGoogleRegister}
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

export default register;
