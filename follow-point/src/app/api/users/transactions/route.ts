import TransactionModel from "@/app/db/models/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-id-user") as string;

    const data = await TransactionModel.findByUserId(userId);

    return NextResponse.json({ data });
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
