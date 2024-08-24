import Link from "next/link";
import Image from "next/image";
import { IEvents } from "@/types";

interface EventCardProps {
  event: IEvents;
}

//! Considering changing <img> to Image in the future
export default function EventsCard({ event }: EventCardProps) {
  return (
    <div className="block h-full shadow-lg transition-transform duration-300 w-64 h-68 transform hover:scale-105">
      <Link href={`/event/${event.slug}`}>
        <img
          src={event.thumbnail}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* <Image
          src={event.thumbnail}
          alt="Banner"
          width={800}
          height={800}
          objectFit="fill"
        /> */}
      </Link>
    </div>
  );
}
