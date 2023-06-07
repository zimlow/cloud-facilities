"use client";
import React, { use, useRef } from "react";

import { useSession, signIn } from "next-auth/react";

const Login = () => {
  const emailRef = useRef();
  const pwRef = useRef();

  const handleSubmit = async () => {
    // inputs are automatically matched with database

    await signIn("credentials", {
      email: emailRef.current.value,
      password: pwRef.current.value,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div className="text-center place-self-center text-8xl">Login and signup here</div>

      <div className="flex flex-col justify-center items-center  gap-1">
        <div className="px-7 py-4 shadow-lg bg-slate-200 rounded-md flex flex-col gap-2 my-10">
          <label htmlFor="email">Email:</label>
          <input
            className="border border-slate-300 rounded-md"
            type="text"
            id="email"
            name="email"
            defaultValue="jimmy@gg.com"
            ref={emailRef}
          />
          <label htmlFor="pw">Password:</label>
          <input
            className="border border-slate-300 rounded-md"
            type="text"
            id="pw"
            name="pw"
            defaultValue="password"
            ref={pwRef}
          />
          <button onClick={handleSubmit} type="submit" className="w-full bg-blue-200">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
