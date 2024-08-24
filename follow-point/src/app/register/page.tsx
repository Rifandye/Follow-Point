import ErrorComponent from "@/components/ErrorComponent";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./page.css";
import { Suspense } from "react";

export default async function RegisterPage() {
  const handleRegister = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      return redirect("/register?error=" + result.error);
    }

    return redirect("/login");
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
            action={handleRegister}
          >
            <div className="group w-full">
              <input id="name" placeholder=" " className="input" name="name" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label htmlFor="email" className="label">
                Name
              </label>
            </div>
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
              Register
            </button>
          </form>
          <div className="text-white mt-10 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login">
              <label className="register-link">Login</label>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
