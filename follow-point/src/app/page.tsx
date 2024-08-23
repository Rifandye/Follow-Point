import Banner from "@/components/Banner";
import {
  FaCalendarAlt,
  FaInfo,
  FaMapMarkedAlt,
  FaTicketAlt,
} from "react-icons/fa";

export default async function Home() {
  const getAllEventData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });

      const { data } = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await getAllEventData();

  return (
    <main className="flex flex-col min-h-screen bg-[rgba(27,29,34,1)]">
      <section className="mt-10">
        <Banner />
      </section>
    </main>
  );
}
