"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createTransaction = async (
  tickets: any,
  amount: any,
  eventId: any
) => {
  const response = await fetch("http://localhost:3000/api/buy/initiate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ eventId, tickets, amount }),
  });

  const result = await response.json();

  if (!response.ok) {
    return redirect("/?error=" + result.error);
  }

  return result;
};

export const payTransaction = async (
  orderId: any,
  tickets: any,
  eventId: any
) => {
  console.log("Masuk Patch");
  const response = await fetch("http://localhost:3000/api/buy/initiate", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ orderId, tickets, eventId }),
  });

  const result = await response.json();

  if (!response.ok) {
    return redirect("/?error=" + result.error);
  }

  return redirect("/user/transactions?message=payment success!");
};
