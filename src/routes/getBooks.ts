import { Route } from "../interfaces/route";
import { acceptedMethods } from "../enums/acceptedMethods";
import db from "../database";

export const getBooks: Route = {
  path: "/books",
  method: acceptedMethods.get,
  handleRoute: (req, res) => {
    const { skip: strSkip = "0", limit: strLimit = "0" } = req.query;
    const skip = Number(strSkip);
    const limit = Number(strLimit);
    const start = skip;
    const end = limit ? skip + limit : undefined;
    res.send(db.slice(start, end));
  },
};
