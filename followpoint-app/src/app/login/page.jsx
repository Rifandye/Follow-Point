"use client";

import { handleLogin } from "@/actions/user";
import { FormError } from "@/components/form-error";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  return (
    <>
      <main className="bg-[rgba(27,29,34,1)] min-h-screen flex flex-col justify-center items-center">
        <img
          src="/Banner-Render-Concept-footer.png"
          alt="logo"
          className="h-50 w-60 mb-12"
        />
        <div className="w-full max-w-xs">
          <FormError />
          <form
            className="flex flex-col items-center space-y-4"
            action={() => {
              handleLogin(input);
            }}
          >
            <div className="group w-full">
              <input
                // type="email"
                id="email"
                placeholder=" "
                className="input"
                name="email"
                onChange={inputHandler}
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
                onChange={inputHandler}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label htmlFor="password" className="label">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="text-black p-2 px-6 mt-10 rounded-md"
              style={{ backgroundColor: "#f6bd43", marginTop: "25px" }}
            >
              Login
            </button>
          </form>
          <div className="text-white mt-10 text-center">
            Don't have an account?{" "}
            <Link href="/register">
              <label className="register-link">Register</label>
            </Link>
          </div>
        </div>
      </main>
      <style jsx>{`
        .group {
          position: relative;
          margin-bottom: 45px;
        }
        .input {
          font-size: 18px;
          padding: 10px 10px 10px 5px;
          display: block;
          width: 100%;
          border: none;
          border-bottom: 1px solid #757575;
          background: transparent;
          color: white;
        }

        .input:-webkit-autofill,
        .input:-webkit-autofill:hover,
        .input:-webkit-autofill:focus,
        .input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #1b1d22 inset !important;
          -webkit-text-fill-color: white !important;
          caret-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .input:focus,
        .input:not(:placeholder-shown) {
          outline: none;
        }
        .label {
          color: #999;
          font-size: 18px;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 5px;
          top: 10px;
          transition: 0.2s ease all;
        }
        .input:focus ~ .label,
        .input:not(:placeholder-shown) ~ .label {
          top: -20px;
          font-size: 14px;
          color: #f6bd43;
        }
        .bar {
          position: relative;
          display: block;
          width: 100%;
        }
        .bar:before,
        .bar:after {
          content: "";
          height: 2px;
          width: 0;
          bottom: 1px;
          position: absolute;
          background: #f6bd43;
          transition: 0.2s ease all;
        }
        .bar:before {
          left: 50%;
        }
        .bar:after {
          right: 50%;
        }
        .input:focus ~ .bar:before,
        .input:focus ~ .bar:after {
          width: 50%;
        }
        .highlight {
          position: absolute;
          height: 60%;
          width: 100px;
          top: 25%;
          left: 0;
          pointer-events: none;
          opacity: 0.5;
        }
        .input:focus ~ .highlight {
          animation: inputHighlighter 0.3s ease;
        }

        .register-link {
          color: #999;
        }

        .register-link:hover {
          color: #f6bd43;
          text-decoration: none;
        }

        @keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }
      `}</style>
    </>
  );
}
