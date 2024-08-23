import { EventModel } from "@/app/db/models/event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await EventModel.getAllEvents();
    return NextResponse.json(
      {
        data: result,
      },
      { status: 200 }
    );
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
