export interface IEvents {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: Date;
  location: string;
  thumbnail: string;
  image: string;
  organizer: string;
  venueFileName: string;
  ticket: {
    ticketId: string;
    name: string;
    price: number;
    stock: number;
  }[];
  booth: {
    name: string;
    description: string;
    image: string;
    items: {
      itemName: string;
      price: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}
