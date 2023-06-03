"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <div className="flex gap-4 ml-auto">
          {/* gotta change this */}
          <p className="text-sky-600 flex">wtf</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
