import { Db, Document } from "mongodb";
import { initialDatabase } from "./initialDatabase";
import { InitializeDB } from "../interfaces/initializeDB";
import log from "npmlog";

export const initializeDB = async (getDb: () => Promise<Db>) => {
  const libraryDb = await getDb();
  try {
    for (let collection of initialDatabase)
      await iniciarCollection(libraryDb, collection);
    return libraryDb;
  } catch (e) {
    log.error("", e);
  }
};

const iniciarCollection = async (libraryDb: Db, collection: InitializeDB) => {
  const { collectionName, instances } = collection;

  try {
    const collectionConnection = libraryDb.collection(collectionName);

    for (let index in instances) {
      try {
        const newDocument: Document = { ...instances[index] };
        await collectionConnection.insertOne(newDocument);
      } catch (e) {
        if (e.code === 11000)
          log.silly(
            "",
            `Instance ${instances[index].name} (${instances[index]._id}) already exists in db, skipping creation...`
          );
        else log.error("", e);
      }
    }
  } catch (e) {
    log.error("", e);
  }
};
