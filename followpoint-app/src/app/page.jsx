import Banner from "@/components/banner";
import EventCard from "@/components/eventCard";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  FaTicketAlt,
  FaInfo,
  FaMapMarkedAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export const getAllEventData = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/events",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Error!");
  }

  const { data } = await response.json();
  return data;
};

export default async function Home() {
  const data = await getAllEventData();

  return (
    <>
      <main className="flex flex-col min-h-screen bg-[rgba(27,29,34,1)]">
        <Navbar />
        <Banner />
        <div className="container mx-auto px-4 text-white text-center text-2xl mt-16 font-semibold font-sans">
          <h1>Follow Point is an app that gives info about various events. Users can see ongoing events, buy tickets, and use 3D maps to find event locations easily. It helps users find events they like and get tickets hassle-free.</h1>
        </div>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-10">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <FaTicketAlt className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
                <h3 className="mb-2 font-bold text-lg text-white">
                  Event Tickets
                </h3>
                <p className="text-gray-300">
                  Easily buy tickets for concerts, festivals, and events.
                </p>
              </div>
              <div>
                <FaInfo className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
                <h3 className="mb-2 font-bold text-lg text-white">
                  Event Info
                </h3>
                <p className="text-gray-300">
                  Get all the details you need to know about each event.
                </p>
              </div>
              <div>
                <FaMapMarkedAlt className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
                <h3 className="mb-2 font-bold text-lg text-white">3D Maps</h3>
                <p className="text-gray-300">
                  Navigate event venues with ease using 3D maps.
                </p>
              </div>
              <div>
                <FaCalendarAlt className="mx-auto mb-4 h-12 w-12 text-indigo-500" />
                <h3 className="mb-2 font-bold text-lg text-white">And More</h3>
                <p className="text-gray-300">
                  Explore additional features that enhance your experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10 mt-15">
            <h2 className="text-xl md:text-3xl font-bold text-white">
              Upcoming Events
            </h2>
          </div>
          <div className="flex flex-wrap gap-5 justify-between">
            {data.map((event, index) => (
              <EventCard data={event} key={index} />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
