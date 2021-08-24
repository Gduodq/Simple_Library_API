import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import { collections } from "../enums/collections";
import getDb from "../database";

export const getBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.get,
  handleRoute: async (req, res) => {
    const { params } = req;
    const { bookId } = params;
    const db = await getDb();
    const bookFound = await db
      .collection(collections.books)
      .findOne({ _id: bookId, isDeleted: false });
    if (!bookFound) res.status(404).send("Book not found :(");
    else res.status(200).send(bookFound);
  },
};
