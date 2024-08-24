import Navbar from "@/components/Navbar";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { formatDate } from "@/app/utils/formatDate";
import ButtonSlugComponent from "@/components/ButtomSlug";
import "./page.css";
import Image from "next/image";

export const getEventBySlug = async (slug: string) => {
  const response = await fetch("http://localhost:3000/api/events/" + slug, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching event details");
  }

  const { data } = await response.json();
  return data;
};

export default async function EventBySlug({ params }: any) {
  const data = await getEventBySlug(params.slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col justify-center items-center text-yellow-500 font-extrabold pb-10">
        <div className="mb-4 mt-4 mx-auto sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 h-64 sm:h-72 md:h-96">
          <Image
            src={data.image}
            alt={data.title}
            width={800}
            height={800}
            quality={100}
          />
        </div>
        <div className="font-bold text-yellow-500 text-2xl text-center mt-4">
          {data.title}
        </div>
        <div className="text-white mt-3 mb-5 mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-2/3 text-left bg-gray-800 bg-opacity-25 p-4 rounded-lg shadow">
          <Markdown remarkPlugins={[remarkGfm]} className="markdown-body">
            {data.description}
          </Markdown>
        </div>
        <div className="flex items-center w-full justify-between mt-3 mb-5 mx-auto sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-2/3">
          <div className="flex flex-row text-yellow-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M3 12l2-2m16 2l-2-2m-6 6h6"
              />
            </svg>
            Date :{" "}
            <span className="text-white ml-2">{formatDate(data.date)}</span>
          </div>
          <div className="flex flex-row text-yellow-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253V19l-4-2-4 2V8l4-2 4 2zM12 6.253l4-2 4 2V19l-4-2-4 2z"
              />
            </svg>
            Location: <span className="text-white ml-2">{data.location}</span>
          </div>
          <div className="flex flex-row text-yellow-500 text-sm mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14m4-2a4 4 0 108 0m4 0h8m-8 0a4 4 0 10-8 0"
              />
            </svg>
            Organizer :{" "}
            <span className="text-white ml-2">{data.organizer}</span>
          </div>
        </div>
        <ButtonSlugComponent data={data} />
        {/* <Footer /> */}
      </main>
    </>
  );
}
