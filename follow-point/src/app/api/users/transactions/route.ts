import TransactionModel from "@/app/db/models/transaction";
import { NextResponse } from "next/server";

export async function GET(request: Response) {
  try {
    const userId = request.headers.get("x-id-user") as string;
    console.log(userId, "<<< userid");

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
