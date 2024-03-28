import { EventModel } from "@/db/models/event";
import { TransactionModel } from "@/db/models/transaction";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = request.headers.get("x-id-user");
    const data = await TransactionModel.findByUserId(userId);
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);

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
