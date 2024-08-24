"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { createTransaction, payTransaction } from "@/actions/payment";
import { formatRupiah } from "@/app/utils/formatPrice";
import { getEventBySlug } from "../page";
import Navbar from "@/components/Navbar";

export default function EventBuyTicketPage({ params }: any) {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);

  function inputHandler(event: any) {
    const { name, value } = event.target;
    const inputValue = parseInt(value, 10);

    const ticket = data.tickets.find((ticket: any) => ticket.ticketId === name);

    if (ticket) {
      if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= ticket.stock) {
        setInput((prevInput: any) => ({
          ...prevInput,
          [name]: inputValue,
        }));
      } else {
        setInput((prevInput: any) => ({
          ...prevInput,
          [name]: prevInput[name] || 0,
        }));
      }
    }
  }

  const handleIncrement = (name: any) => {
    const ticket = data.tickets.find((ticket: any) => ticket.ticketId === name);
    if (ticket) {
      setInput((prevInput: any) => {
        const currentValue = parseInt(prevInput[name]) || 0;
        const newValue = currentValue + 1;
        if (newValue <= ticket.stock) {
          return {
            ...prevInput,
            [name]: newValue,
          };
        } else {
          return prevInput;
        }
      });
    }
  };

  const handleDecrement = (name: any) => {
    setInput((prevInput: any) => ({
      ...prevInput,
      [name]: Math.max((parseInt(prevInput[name]) || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      let totalPrice = 0;
      data.tickets.forEach((ticket: any) => {
        totalPrice += (input[ticket.ticketId] || 0) * ticket.price;
      });
      setTotalPrice(totalPrice);
    }
  }, [input, data, loading]);

  const fetchData = async () => {
    const res = await getEventBySlug(params.slug);
    setData(res);
    setLoading(false);
  };

  const handlePayButton = async (e: any) => {
    e.preventDefault();
    // console.log("clicked", input, totalPrice);
    const response = await createTransaction(input, totalPrice, data._id);

    // console.log(response.transactionToken, "<<< transaction token");
    // console.log("test");

    window.snap.pay(response.transactionToken, {
      onSuccess: function (result: any) {
        //fetch patch
        payTransaction(response.orderId, input, data._id);
      },
    });
  };

  const DayIcon = () => (
    <svg
      className="w-6 h-6 mr-2 text-yellow-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  const PriceIcon = () => (
    <svg
      className="w-6 h-6 mr-2 text-yellow-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5.5,5.5m-2.5,0a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0"></path>
      <path d="M2 2l10 10-3 9-9-3z"></path>
      <path d="M14 14l6-6"></path>
    </svg>
  );

  const StockIcon = () => (
    <svg
      className="w-6 h-6 mr-2 text-yellow-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M3 3v18h18"></path>
      <path d="M18 6l-6.75 9-4.5-6L6 12l12-6z"></path>
    </svg>
  );

  // console.log(input);

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.MIDTRANS_SERVER_KEY}
      />

      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-[rgba(27,29,34,1)]">
        <div className="container max-w-2xl mx-auto px-4 py-8 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center text-yellow-500">
            Checkout Tickets
          </h1>
          {loading ? (
            <div className="text-center text-white">Loading tickets...</div>
          ) : (
            <form className="space-y-6">
              {data.tickets.map((ticket: any) => (
                <div
                  key={ticket.ticketId}
                  className="bg-gray-800 p-4 rounded-md"
                >
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-yellow-500 col-span-2">
                      <DayIcon />
                      Day:{" "}
                      <span className="text-white ml-2">{ticket.name}</span>
                    </div>
                    <div className="flex items-center text-yellow-500 justify-end">
                      <StockIcon />
                      Stock:{" "}
                      <span className="text-white ml-2">{ticket.stock}</span>
                    </div>
                    <div className="col-span-3 flex items-center text-yellow-500">
                      <PriceIcon />
                      Price:{" "}
                      <span className="text-white ml-2">
                        {formatRupiah(ticket.price)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-10">
                    {" "}
                    <button
                      type="button"
                      className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm"
                      onClick={() => handleDecrement(ticket.ticketId)}
                      disabled={input[ticket.ticketId] <= 0}
                    >
                      -
                    </button>
                    <input
                      name={ticket.ticketId}
                      value={input[ticket.ticketId] || 0}
                      onChange={inputHandler}
                      className="w-20 p-2 text-center rounded-md text-sm"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm"
                      onClick={() => handleIncrement(ticket.ticketId)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-center text-lg text-white">
                Total: {formatRupiah(totalPrice)}
              </div>
              <div className="flex justify-center mt-10">
                <button
                  type="submit"
                  className="btn"
                  onClick={handlePayButton}
                  disabled={totalPrice === 0}
                >
                  Proceed to Pay
                </button>
              </div>
            </form>
          )}
        </div>
        {/* <Footer /> */}
      </main>
      <style jsx>{`
        .btn {
          --color: #f6bd43;
          --color2: rgb(10, 25, 30);
          padding: 0.8em 1.75em;
          background-color: transparent;
          border-radius: 6px;
          border: 0.3px solid var(--color);
          transition: 0.5s;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          z-index: 1;
          font-weight: 300;
          font-size: 13px;
          font-family: "Roboto", "Segoe UI", sans-serif;
          text-transform: uppercase;
          color: var(--color);
        }

        .btn::after,
        .btn::before {
          content: "";
          display: block;
          height: 100%;
          width: 100%;
          transform: skew(90deg) translate(-50%, -50%);
          position: absolute;
          inset: 50%;
          left: 25%;
          z-index: -1;
          transition: 0.5s ease-out;
          background-color: var(--color);
        }

        .btn::before {
          top: -50%;
          left: -25%;
          transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
        }

        .btn:hover::before {
          transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
        }

        .btn:hover::after {
          transform: skew(45deg) translate(-50%, -50%);
        }

        .btn:hover {
          color: var(--color2);
        }

        .btn:active {
          filter: brightness(0.7);
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
