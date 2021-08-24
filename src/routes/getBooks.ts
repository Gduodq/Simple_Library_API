import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import { collections } from "../enums/collections";
import getDb from "../database";

export const getBooks: Route = {
  path: "/books",
  method: acceptedMethods.get,
  handleRoute: async (req, res) => {
    const { skip: strSkip = "0", limit: strLimit = "0" } = req.query;
    const skip = Number(strSkip);
    const limit = Number(strLimit);
    const db = await getDb();
    const booksFound = await db
      .collection(collections.books)
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .toArray();
    if (!Array.isArray(booksFound))
      res.status(404).send("An internal error occurred :(");
    else res.status(200).send(booksFound);
  },
};
