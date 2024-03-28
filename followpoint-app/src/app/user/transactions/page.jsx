import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TicketCard from "@/components/ticketCard";
import { cookies } from "next/headers";

export const getUserTransactions = async () => {
  // console.log(cookies().toString(), "<<<<cookies");
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/user/transactions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error!");
  }

  const { data } = await response.json();
  return data;
};

export default async function UserTicketsPage() {
  const data = await getUserTransactions();
  return (
    <main className="flex flex-col min-h-screen bg-[rgba(27,29,34,1)]">
      <Navbar />

      <div className="container mx-auto px-4 py-8 text-white">
        <div className="font-bold text-center text-yellow-500 text-2xl mb-5">
          My Transactions
        </div>
        <div>
          {data.map((x, i) => {
            return (
              <>
                <TicketCard key={i} data={x} />
              </>
            );
          })}
        </div>
      </div>
      <Footer className="footer" />
    </main>
  );
}
