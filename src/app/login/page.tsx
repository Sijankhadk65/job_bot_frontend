"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={() => signIn("google")}
        className="bg-black text-white px-6 py-2 rounded-md"
      >
        Login with Google
      </button>
    </div>
  );
}
