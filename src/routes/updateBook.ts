import { Route } from "../interfaces/route";
import { Book } from "../interfaces/book";
import { acceptedMethods } from "../enums/acceptedMethods";
import { bookContract } from "../contracts/book";
import { collections } from "../enums/collections";
import getDb from "../database";

interface UpdateBook
  extends Partial<
    Omit<Book, "_id" | "registerDate" | "isDeleted" | "deletedAt">
  > {}

export const updateBook: Route = {
  path: "/books/:bookId",
  method: acceptedMethods.put,
  handleRoute: async (req, res) => {
    const { params, body } = req;
    const validation = bookContract.update(body);
    if (Array.isArray(validation)) {
      res.status(422).send(validation);
      return;
    }
    const { bookId } = params;
    const newFieldsBook: UpdateBook = body;
    const db = await getDb();
    const operationResult = await db
      .collection(collections.books)
      .findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        { $set: newFieldsBook },
        { returnDocument: "after" }
      );
    if (!operationResult.ok) res.status(404).send("Book not found :(");
    else res.status(200).send(operationResult.value);
  },
};
