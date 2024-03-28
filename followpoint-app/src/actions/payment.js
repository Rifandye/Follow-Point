"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createTransaction = async (tickets, amount, eventId) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/buy/initiate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({ eventId, tickets, amount }),
    }
  );
  const result = await response.json();

  //   console.log(result.transactionToken, "<<<< ini adalah result");

  if (!response.ok) {
    return redirect("/?error=" + result.error);
  }

  return result;
};

export const payTransaction = async (orderId, tickets, eventId) => {
  console.log("Masuk Patch");
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/buy/initiate",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({ orderId, tickets, eventId }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return redirect("/?error=" + result.error);
  }

  return redirect("/user/transactions?message=payment success!");
};
