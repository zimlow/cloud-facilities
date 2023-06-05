// import NextAuth from 'next-auth';

// declare module 'next-auth' {
//     interface Session {
//         user:{
//             user_email: string
//             accessToken: string
//         }
//     }

import NextAuth from "next-auth";

module.exports = (NextAuth) => {
  NextAuth.Session = {
    user: {
      user_email: "",
      user_lastName: "",
      user_firstName: "",
      accessToken: "",
    },
  };
};
