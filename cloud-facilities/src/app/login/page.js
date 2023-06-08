"use client";
import React, { useRef } from "react";

import { signIn } from "next-auth/react";

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
      <section className="relative block" style={{ height: "30vh" }}>
        <div
          className="absolute w-full h-full overflow-hidden bg-center bg-cover"
          style={{
            backgroundImage: "url('/moon.jpg')",
          }}
        >
          <div className="flex text-center justify-center items-center text-8xl font-bold text-amber-100 h-full">
            <p className="drop-shadow-2xl">Login</p>
          </div>
        </div>
      </section>

      <div className="flex flex-row w-full text-start justify-center items-center my-10">
        <div className="border-solid border-amber-100 border-4 p-4  rounded-lg shadow-lg">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            className="border border-slate-300 rounded-md mb-3"
            type="text"
            id="email"
            name="email"
            defaultValue="jimmy@gg.com"
            ref={emailRef}
          />
          <br />
          <label htmlFor="pw">Password:</label>
          <br />
          <input
            className="border border-slate-300 rounded-md mb-3"
            type="password"
            id="pw"
            name="pw"
            defaultValue="password"
            ref={pwRef}
          />
          <br />
          <button onClick={handleSubmit} type="submit" className="w-full bg-blue-200 rounded-md">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
