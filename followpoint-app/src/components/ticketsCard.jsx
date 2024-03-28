export default function TicketsCard({ data }) {
    const [type, price, stock] = data
  return (
    <div>
      {type} {price} stock : {stock} 
    </div>
  );
}
