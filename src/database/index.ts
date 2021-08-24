import { connectToDb } from "./connectToDb";

const getDb = async () => await connectToDb();

export default getDb;
