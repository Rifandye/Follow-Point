import Banner from "@/components/Banner";
import EventsCard from "@/components/EventsCard";
import Navbar from "@/components/Navbar";
import { IEvents } from "@/types";
import {
  FaCalendarAlt,
  FaInfo,
  FaMapMarkedAlt,
  FaTicketAlt,
} from "react-icons/fa";

export default async function Home() {
  const getAllEventData = async () => {
    const response = await fetch("http://localhost:3000/api/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      return { message: "Error fetching data" };
    }

    const { data } = await response.json();
    return data;
  };

  const data = await getAllEventData();

  return (
    <>
      <Navbar />
      <main className="h-full mx-20 ">
        <section>
          <Banner />
        </section>
        <section>
          <div className="container mx-auto px-4 text-white text-center text-xl my-20 font-bold font-sans">
            <h1>
              Follow Point is an app that gives info about various events. Users
              can see ongoing events, buy tickets, and use 3D maps to find event
              locations easily. It helps users find events they like and get
              tickets hassle-free.
            </h1>
          </div>
        </section>
        <section>
          <div className="container mx-auto my-20">
            <h2 className="text-xl font-bold text-center text-white mb-10">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <FaTicketAlt className="mx-auto mb-4 h-11 w-11 text-indigo-500" />
                <h3 className="mb-2 font-bold text-base text-white">
                  Event Tickets
                </h3>
                <p className="text-gray-300 text-sm">
                  Easily buy tickets for concerts, festivals, and events.
                </p>
              </div>
              <div>
                <FaInfo className="mx-auto mb-4 h-11 w-11 text-indigo-500" />
                <h3 className="mb-2 font-bold text-base text-white">
                  Event Info
                </h3>
                <p className="text-gray-300 text-sm">
                  Get all the details you need to know about each event.
                </p>
              </div>
              <div>
                <FaMapMarkedAlt className="mx-auto mb-4 h-11 w-11 text-indigo-500" />
                <h3 className="mb-2 font-bold text-base text-white">3D Maps</h3>
                <p className="text-gray-300 text-sm">
                  Navigate event venues with ease using 3D maps.
                </p>
              </div>
              <div>
                <FaCalendarAlt className="mx-auto mb-4 h-11 w-11 text-indigo-500" />
                <h3 className="mb-2 font-bold text-base text-white">
                  And More
                </h3>
                <p className="text-gray-300 text-sm">
                  Explore additional features that enhance your experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto my-24 flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16">
              {data?.map((events: IEvents, index: number) => (
                <EventsCard event={events} key={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
