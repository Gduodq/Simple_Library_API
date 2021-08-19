import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import db from "../database";
import { Book } from "../interfaces/book";
import { bookContract } from "../contracts/book";
import { v4 as uuid } from "uuid";

interface CreateBook extends Omit<Book, "id" | "registerDate"> {}

export const createBook: Route = {
  path: "/books",
  method: acceptedMethods.post,
  handleRoute: (req, res) => {
    const validation = bookContract.create(req.body);
    if (Array.isArray(validation)) {
      res.status(422).send(validation);
      return;
    }
    const body: CreateBook = req.body;
    const newBook: Book = { ...body, id: uuid(), registerDate: new Date() };
    db.push(newBook);
    res.status(200).send(newBook);
  },
};
