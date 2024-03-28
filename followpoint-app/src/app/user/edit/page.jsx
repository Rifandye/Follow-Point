"use client";
import { getUserData, handleEdit } from "@/actions/user";
import Footer from "@/components/footer";
import { FormError } from "@/components/form-error";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({
    name: "",
    email: "",
    newEmail: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getUserData();
    delete data._id;
    data.newEmail = data.email;
    setInput(data);
    setLoading(false);
  };

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }
  
  return (
    <>
      <Navbar />
      <main className="bg-[rgba(27,29,34,1)] min-h-screen flex flex-col justify-center items-center">
        {loading ? (
          <div className="text-white">Loading user data...</div>
        ) : (
          <>
            <div className="w-full max-w-xs">
              <div className="font-bold text-yellow-500 text-2xl text-center m-8">
                Edit Profile
              </div>
              <FormError />
              <form
                className="flex flex-col items-center space-y-4"
                action={() => {
                  handleEdit(input);
                }}
              >
                <div className="group w-full">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    className="input"
                    name="name"
                    onChange={inputHandler}
                    value={input ? input.name : ""}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                </div>
                <div className="group w-full">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="input"
                    name="newEmail"
                    onChange={inputHandler}
                    value={input ? input.newEmail : ""}
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
                    name="newPassword"
                    onChange={inputHandler}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label htmlFor="password" className="label">
                    New Password
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
                    Old Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="text-black p-2 px-6 mt-10 rounded-md"
                  style={{ backgroundColor: "#f6bd43", marginTop: "25px" }}
                >
                  Edit
                </button>
              </form>
            </div>
          </>
        )}
        <Footer className="footer" />
      </main>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .group:first-child {
          margin-bottom: 0px;
        }

        .group {
          position: relative;
          margin-bottom: 20px;
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
