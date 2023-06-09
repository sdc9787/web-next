"use client";
import { signOut } from "next-auth/react";

export function LogOutBtn() {
  return (
    <button
      className="navber-login"
      onClick={() => {
        signOut({ callbackUrl: "http://localhost:3000/" });
      }}
    >
      로그아웃
    </button>
  );
}
