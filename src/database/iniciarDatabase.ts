import { Db, Document } from "mongodb";
import { initialDatabase } from "./initialDatabase";
import { InitializeDB } from "../interfaces/initializeDB";

export const initializeDB = async (getDb: Function) => {
  const libraryDb = await getDb();
  try {
    for (let collection of initialDatabase)
      await iniciarCollection(libraryDb, collection);
    return libraryDb;
  } catch (e) {
    console.error(e);
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
          console.log(
            `Instance ${instances[index].name} (${instances[index]._id}) already exists in db, skipping creation...`
          );
        else console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
