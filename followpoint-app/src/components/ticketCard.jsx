"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { formatDate } from "@/utils/dateFormat";

export default function TicketCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const generateQRCodes = async () => {
      const qrCodePromises = data.tickets.map((x) =>
        QRCode.toDataURL(x.ticketId)
      );
      const qrCodeDataUrls = await Promise.all(qrCodePromises);
      setQrCodes(qrCodeDataUrls);
    };

    generateQRCodes();
  }, [data.tickets]);

  return (
    <div className="ticket-card rounded-lg bg-gradient-to-r from-indigo-700 to-purple-900 text-white p-4 shadow-lg mb-8 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">{data.eventInfo.title}</div>
        <div className="text-sm">
          ORDER ID: {data.orderId.substring(data.orderId.length - 5)}
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>{formatDate(data.eventInfo.date)}</div>
        <div>
          Status:{" "}
          <span
            className={`${data.paidStatus ? "text-green-400" : "text-red-400"}`}
          >
            {data.paidStatus ? "Paid" : "Failed"}
          </span>
        </div>
      </div>
      {!data.paidStatus && (
        <div className="text-center text-red-400 font-semibold mt-4">
          Transaction Failed
        </div>
      )}
      {data.paidStatus && (
        <div className="flex flex-col items-center mt-4">
          <button
            className="mb-2 py-2 px-4 bg-indigo-800 hover:bg-indigo-700 rounded-full transition-colors duration-150"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              See Tickets ({data.tickets.length})
            </span>
          </button>
          {showDetails && (
            <div className="ticket-details flex justify-center items-center flex-wrap gap-4 mt-2">
              {qrCodes.map((src, index) => (
                <div
                  key={index}
                  className="ticket-item bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
                >
                  <div className="font-semibold mb-2">Ticket {index + 1}</div>
                  <img
                    src={src}
                    alt={`QR code for ticket ${index + 1}`}
                    className="w-32 h-32 mb-4"
                  />
                  <div className="text-center">
                    <div className="mb-2">
                      Day:{" "}
                      {
                        data.eventInfo.tickets.find(
                          (ticket) =>
                            ticket.ticketId === data.tickets[index].type
                        )?.name
                      }
                    </div>
                    <div>
                      Ticket Code: {data.tickets[index].type}-
                      {data.tickets[index].ticketId.substring(
                        data.tickets[index].ticketId.length - 5
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
