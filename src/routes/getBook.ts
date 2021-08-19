import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import db from "../database";

export const getBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.get,
  handleRoute: (req, res) => {
    const { params } = req;
    const { bookId } = params;

    const foundBook = db.find((book) => book.id === bookId);

    if (!foundBook) res.status(404).send("Book not found :(");
    else res.send(foundBook);
  },
};
