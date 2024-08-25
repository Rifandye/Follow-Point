import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./page.css";
import Image from "next/image";
import ErrorComponent from "@/components/ErrorComponent";
import { Suspense } from "react";

export default async function LoginPage() {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return redirect("/login?error=" + result.error);
    }

    cookies().set("Authorization", `Bearer ${result.access_token}`);

    return redirect("/");
  };

  return (
    <>
      <main className="min-h-screen flex flex-col justify-center items-center">
        <Image
          src={"/Logo-Navbar.png"}
          alt="logo"
          width={180}
          height={180}
          quality={100}
        />
        <Suspense fallback={<div>Loading error message...</div>}>
          <ErrorComponent />
        </Suspense>
        <div className="w-full max-w-xs">
          <form
            className="flex flex-col items-center space-y-8"
            action={handleLogin}
          >
            <div className="group w-full">
              <input
                id="email"
                placeholder=" "
                className="input"
                name="email"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label htmlFor="email" className="label">
                Email
              </label>
            </div>

            <div className="group w-full">
              <input
                type="password"
                id="password"
                placeholder=" "
                className="input"
                name="password"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="text-black p-2 px-6 rounded-md"
              style={{ backgroundColor: "#f6bd43", marginTop: "25px" }}
            >
              Login
            </button>
          </form>
          <div className="text-white mt-10 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <label className="register-link">Register</label>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
