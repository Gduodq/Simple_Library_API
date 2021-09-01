import { BookPurchase } from "./bookPurchase";

export interface Purchase {
  _id: string;
  books: BookInPurchase[];
  registerDate: Date;
  isDeleted: Boolean;
  deletedAt?: Date;
}

interface BookInPurchase extends BookPurchase {
  price: number;
}
