import Link from "next/link";

export default function EventCard({ data }) {
  return (
    <div className="m-1 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 w-64 h-68 transform hover:scale-105">
      <Link href={`/event/${data.slug}`}>
        <div className="block h-full">
          <img
            src={data.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
}
