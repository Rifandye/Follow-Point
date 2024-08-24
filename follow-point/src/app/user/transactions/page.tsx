import { getUserTransactions } from "@/actions/payment";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";

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
          {data.map((x: any, i: any) => {
            return (
              <>
                <TicketCard key={i} data={x} />
              </>
            );
          })}
        </div>
      </div>
      {/* <Footer className="footer" /> */}
    </main>
  );
}
