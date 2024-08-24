import Link from "next/link";
import Image from "next/image";
import { IEvents } from "@/types";

interface EventCardProps {
  event: IEvents;
}

//! Considering changing <img> to Image in the future
export default function EventsCard({ event }: EventCardProps) {
  return (
    <div className="block h-full">
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
    </div>
  );
}
