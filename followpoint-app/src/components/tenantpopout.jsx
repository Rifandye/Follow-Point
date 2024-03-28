export function TenantPopup({ tenant, onClose }) {
  if (!tenant) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "30%",
        height: "100%",
        backgroundColor: "white",
        boxShadow: "-5px 0 5px rgba(0,0,0,0.2)",
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <button onClick={onClose}>Close</button>
      <h2>{tenant.name}</h2>
      <p>{tenant.description}</p>
    </div>
  );
}
