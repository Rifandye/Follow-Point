"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createTransaction = async (
  tickets: any,
  amount: any,
  eventId: any
) => {
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
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL  + "/api/buy/initiate", {
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

export const getEventBySlug = async (slug: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL  + "/api/events/" + slug,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching event details");
  }

  const { data } = await response.json();
  return data;
};

export const getUserTransactions = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL  + "/api/users/transactions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error!");
  }

  const { data } = await response.json();
  return data;
};
