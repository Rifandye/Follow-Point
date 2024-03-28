export default function SideBarMap({ tenantData, onClose }) {
  console.log(tenantData.items[0].itemName);
  return (
    <aside className="fixed top-0 right-0 h-full w-full md:w-96 bg-black bg-opacity-90 p-6 overflow-auto z-50 shadow-lg text-white">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-6">{tenantData.name}</h2>
      {tenantData ? (
        <div>
          <div className="mb-4">
            <img
              src={tenantData.image}
              alt={tenantData.name}
              className="object-cover w-full h-48 rounded-lg shadow-md"
            />
          </div>
          <p className="text-sm mb-4">{tenantData.description}</p>
          <div className="mt-10">
            <table className="w-full text-sm text-white">
              <thead className="text-xs uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenantData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{item.itemName}</td>
                    <td className="px-6 py-4">Rp.{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center">No tenant selected.</p>
      )}
    </aside>
  );
}
