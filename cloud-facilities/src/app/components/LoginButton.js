"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div className="flex gap-4 ml-auto">
          <Link href="/profile" className="text-sky-600 flex">
            {session?.user.user_firstName} {session?.user.user_lastName}
          </Link>
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
