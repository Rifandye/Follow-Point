import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 100,
        padding: "5px 10px",
        fontSize: "20px",
        cursor: "pointer",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        lineHeight: "1",
        boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
      aria-label="Go back"
    >
      ←
    </button>
  );
}
