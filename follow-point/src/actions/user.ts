"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  cookies().delete("Authorization");
  redirect("/login");
};

export const isLoggedIn = () => {
  return cookies().get("Authorization");
};
