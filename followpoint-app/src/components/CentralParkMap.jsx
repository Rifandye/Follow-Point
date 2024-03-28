export default function CentralParkVenue() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#f6bd43",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "rgba(27,29,34,0.8)",
        padding: "10px 20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      Central Park, New City Venue
    </div>
  );
}
