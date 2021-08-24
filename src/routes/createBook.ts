import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import { collections } from "../enums/collections";
import getDb from "../database";
import { Book } from "../interfaces/book";
import { bookContract } from "../contracts/book";
import { v4 as uuid } from "uuid";
import { Document } from "mongodb";

interface CreateBook
  extends Omit<Book, "_id" | "registerDate" | "isDeleted" | "deletedAt"> {}

export const createBook: Route = {
  path: "/books",
  method: acceptedMethods.post,
  handleRoute: async (req, res) => {
    const validation = bookContract.create(req.body);
    if (Array.isArray(validation)) {
      res.status(422).send(validation);
      return;
    }
    const body: CreateBook = req.body;
    const newBook: Book = {
      ...body,
      _id: uuid(),
      registerDate: new Date(),
      isDeleted: false,
    };
    const db = await getDb();
    await db.collection(collections.books).insertOne(newBook as Document);
    res.status(200).send(newBook);
  },
};
