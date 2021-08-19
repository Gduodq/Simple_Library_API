import { Route } from "../interfaces/route";
import { Book } from "../interfaces/book";
import { acceptedMethods } from "../enums/acceptedMethods";
import { bookContract } from "../contracts/book";
import db from "../database";

interface UpdateBook extends Partial<Omit<Book, "id" | "registerDate">> {}

export const updateBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.put,
  handleRoute: (req, res) => {
    const { params, body } = req;
    const validation = bookContract.update(body);
    if (Array.isArray(validation)) {
      res.status(422).send(validation);
      return;
    }
    const { bookId } = params;
    const newFieldsBook: UpdateBook = body;
    const indexFound = db.findIndex((book) => book.id === bookId);
    if (indexFound === -1) res.status(404).send("Book not found :(");
    else {
      const updatedBook = { ...db[indexFound], ...newFieldsBook };
      db[indexFound] = updatedBook;
      res.status(200).send(updatedBook);
    }
  },
};
