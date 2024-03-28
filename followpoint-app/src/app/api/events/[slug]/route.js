import { EventModel } from "@/db/models/event";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const data = await EventModel.getEventBySlug(params.slug);
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
