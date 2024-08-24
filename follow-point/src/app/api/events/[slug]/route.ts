import { EventModel } from "@/app/db/models/event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const result = await EventModel.getEventBySlug(slug);

    if (!result) {
      return NextResponse.json(
        {
          error: "Event not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      }
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
