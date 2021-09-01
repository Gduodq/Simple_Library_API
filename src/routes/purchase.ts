import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import { collections } from "../enums/collections";
import getDb from "../database";
import { Book } from "../interfaces/book";
import { BookPurchase } from "../interfaces/bookPurchase";
import { purchaseContract } from "../contracts/purchase";
import { v4 as uuid } from "uuid";
import Broker from "../rabbit";
import log from "npmlog";
import { Db } from "mongodb";

export const purchase: Route = {
  path: "/purchase",
  method: acceptedMethods.post,
  handleRoute: async (req, res) => {
    const validation = purchaseContract.default({ purchase: req.body });
    if (Array.isArray(validation)) {
      res.status(422).send(validation);
      return;
    }

    const booksPurchase = req.body as BookPurchase[];
    const booksIds = booksPurchase.map(({ bookId }) => bookId);
    const db = await getDb();
    const booksFound = await getBooksFromDB(db, booksIds, res);
    const booksForCheckout = getBooksInfoForCheckout(booksFound, booksPurchase);
    try {
      Broker.sendToQueue("req_payment", { booksForCheckout });
    } catch (e) {
      res.status(500).send(e);
      log.error("", e);
      return;
    }
    const booksForPurchase = booksForCheckout.map(
      ({ bookId = "", price, quantity = 1, sellerCode = "" }) => ({
        bookId,
        price,
        quantity,
        sellerCode,
      })
    );
    const newPurchase = {
      _id: uuid(),
      books: booksForPurchase,
      registerDate: new Date().toISOString(),
      isDeleted: false,
    } as any;
    db.collection(collections.purchases).insertOne(newPurchase as Document);
    delete newPurchase.isDeleted;
    delete newPurchase.registerDate;
    res.status(200).send(newPurchase);
  },
};

const getBooksFromDB = async (db: Db, booksIds: string[], res: any) => {
  const booksFound = (await db
    .collection(collections.books)
    .find(
      { _id: { $in: booksIds }, isDeleted: false },
      { projection: { _id: 1, price: 1, name: 1, author: 1 } }
    )
    .toArray()) as Book[];
  const notFoundIds = booksIds.filter(
    (bookId) => booksFound.findIndex(({ _id }) => _id === bookId) < 0
  );
  if (notFoundIds.length) {
    res.status(400).send({
      error: `The following book ids doesn't exists: ${JSON.stringify(
        notFoundIds
      )}`,
      data: { notFoundIds },
    });
  }
  return booksFound;
};

const getBooksInfoForCheckout = (
  booksFound: Book[],
  booksPurchase: BookPurchase[]
) => {
  return booksFound.map((book) => {
    const bookFromPurchase = booksPurchase.find(
      ({ bookId }) => bookId === book._id
    );
    return { ...bookFromPurchase, ...book, _id: undefined };
  });
};
