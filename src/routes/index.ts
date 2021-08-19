import { getBooks } from "./getBooks";
import { getBook } from "./getBook";
import { createBook } from "./createBook";
import { updateBook } from "./updateBook";
import { deleteBook } from "./deleteBook";
import { Route } from "../interfaces/route";

export const routes: Route[] = [
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
];
