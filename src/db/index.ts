import { MongoClient, Db } from "mongodb";

const DATABASE_NAME = "macquarieschool";
const CONNECTION_URL = `mongodb+srv://megajandro:0YcN119rYRETPyFD@cluster0.enmbu.mongodb.net/${DATABASE_NAME}`;

export class DbClient {

    public getData(collectionName: string, limit: number= 20) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(CONNECTION_URL, { useUnifiedTopology: true });
            client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    db.db().collection(collectionName).find().limit(limit).toArray((err2, result) => {
                        if (err2) {
                            reject(err2);
                        }
                        db.close();
                        return resolve(result);
                    });
                }
            });
        });
    }
}
