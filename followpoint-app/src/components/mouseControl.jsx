export default function MouseControl() {
  return (
    <main
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        margin: "1rem",
        padding: "1.5rem",
        borderRadius: "0.5rem",
      }}
      className="absolute bottom-0 left-0"
    >
      <h1 className="text-xl font-bold mb-4">Mouse Control</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Left - Rotate</li>
        <li>Right - Move</li>
        <li>Middle - Zoom</li>
      </ul>
    </main>
  );
}
