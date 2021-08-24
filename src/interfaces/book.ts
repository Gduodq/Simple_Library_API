export interface Book {
  _id: string;
  name: string;
  author: string;
  price: number;
  registerDate: Date;
  isDeleted: Boolean;
  deletedAt?: Date;
}
