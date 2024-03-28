import { EventModel } from "@/db/models/event";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const data = await EventModel.getAllEvents();
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
