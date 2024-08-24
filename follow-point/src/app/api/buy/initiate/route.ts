import { EventModel } from "@/app/db/models/event";
import TransactionModel from "@/app/db/models/transaction";
import UserModel from "@/app/db/models/user";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import midtransClient from "midtrans-client";

//! Need more refactoring in the future
export async function POST(request: NextRequest) {
  try {
    const { eventId, tickets, amount } = await request.json();

    const order_id = uuidv4();

    const userId = request.headers.get("x-id-user");

    if (!userId) {
      throw new Error("No User is found");
    }

    const user = await UserModel.findById(userId);

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
    });

    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        email: user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    const transactionToken = transaction.token;

    const ticketsArray: { ticketId: string; type: string }[] = [];

    //! Need to find another way
    type Tickets = Record<string, number>;
    const typedTickets = tickets as Tickets;
    for (const [type, quantity] of Object.entries(typedTickets)) {
      if (typeof quantity === "number") {
        for (let i = 0; i < quantity; i++) {
          ticketsArray.push({
            ticketId: uuidv4(),
            type: type,
          });
        }
      } else {
        throw new Error(`Invalid quantity type for ticket type ${type}`);
      }
    }

    await TransactionModel.createTransaction({
      orderId: order_id,
      userId: new ObjectId(String(userId)),
      eventId: new ObjectId(String(eventId)),
      transactionToken,
      tickets: ticketsArray,
      paidStatus: false,
      paidDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ orderId: order_id, transactionToken });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

//! Need more refactoring in the future
export async function PATCH(request: NextResponse) {
  try {
    const { orderId, tickets, eventId } = await request.json();

    const order = await TransactionModel.getByOrderId(orderId);

    if (!order) {
      throw new Error("Order Not Found");
    }

    if (orderId !== order.orderId.toString()) throw new Error("Forbidden");

    if (order.paidStatus === true) throw new Error("Already paid");

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      throw new Error(
        "MIDTRANS_SERVER_KEY is not set in environment variables"
      );
    }

    const serverKeyBase64 = Buffer.from(serverKey + ":").toString("base64");

    const { data } = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization: "Basic " + serverKeyBase64,
        },
      }
    );

    if (data.status_code === "200" && data.transaction_status === "capture") {
      const result = await TransactionModel.updateOrderById(orderId);

      await EventModel.decrementEventTicket(eventId, tickets);

      return NextResponse.json(result);
    } else {
      throw { name: "MidtransError" };
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
