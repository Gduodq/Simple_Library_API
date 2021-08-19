import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import db from "../database";

export const deleteBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.delete,
  handleRoute: (req, res) => {
    const { params } = req;
    const { bookId } = params;
    const indexFound = db.findIndex((book) => book.id === bookId);
    if (indexFound === -1) res.status(404).send("Book not found :(");
    else {
      const book = db[indexFound];
      db.splice(indexFound, 1);
      res.status(200).send(book);
    }
  },
};
