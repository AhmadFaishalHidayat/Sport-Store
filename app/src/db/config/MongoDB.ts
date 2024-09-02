import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI_DB as string;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const db = client.db("GC02");
export default db;
// export function getCollection(collectionName : string) {
//     return db.collection(collectionName)
//   }
