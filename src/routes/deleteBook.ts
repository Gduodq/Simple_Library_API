import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import { collections } from "../enums/collections";
import getDb from "../database";

export const deleteBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.delete,
  handleRoute: async (req, res) => {
    const { params } = req;
    const { bookId } = params;
    const db = await getDb();
    const operationResult = await db
      .collection(collections.books)
      .findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: new Date().toISOString() } },
        { returnDocument: "after" }
      );
    if (!operationResult.ok) res.status(404).send("Book not found :(");
    else res.status(200).send(operationResult.value);
  },
};
