import { MongoClient, ObjectId } from "mongodb";
import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";
import { EventData } from '../db/Event';

const eventsCache = new ExpirationStrategy(new MemoryStorage());

export class DbClient {

    private conectionUrl() {
        return `mongodb://mongomacquarie:27017/macquarieschool?retryWrites=true&connect=direct`;
    }

    public findById(collectionName: string, id: string) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    db.db().collection(collectionName).find( { _id : new ObjectId(id)  }).toArray((err2, result) => {
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

    public find(collectionName: string, where: object) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    db.db().collection(collectionName).find(where).toArray((err2, result) => {
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

    public fetchEvents(collectionName: string, languaje?: string, limit: number= 20) {
        const cacheKey = `${collectionName}-${languaje}`;
        return new Promise((resolve, reject) => {
            return eventsCache.getItem<EventData[]>(cacheKey).then(cacheResult => {
                if (languaje && cacheResult) {
                    return resolve(cacheResult);
                }
                const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
                client.connect( (err, db) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        console.info('Database successfully connection!');
                        const where = { dueDate: { "$gt" : new Date().toISOString().slice(0, 24) + "" }};
                        if (languaje) {
                            Object.assign(where, {languaje});
                        }
                        db.db().collection(collectionName).find(where).sort('dueDate', 1).limit(limit).toArray((err2, result) => {
                            if (err2) {
                                reject(err2);
                            }
                            db.close();
                            if (languaje !== undefined) eventsCache.setItem(cacheKey, result, {  ttl: 86400 });
                            return resolve(result);
                        });
                    }
                });
            })

        });
    }

    public insertData(collectionName: string, doc: any) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            return client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    return db.db().collection(collectionName).insertOne(doc).then(result => {
                        console.log(
                            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
                          );
                        db.close();
                        return resolve(result);
                    }).catch((err2) => {
                        console.log(err2);
                        Promise.reject(err2);
                    });
                }
            });
        });
    }

    public deleteData(collectionName: string, id: string) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            return client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    return db.db().collection(collectionName).deleteOne({ _id: new ObjectId(id)}).then(result => {
                        console.log(
                            `${result.deletedCount} documents was deleted with the _id: ${id}`,
                          );
                        db.close();
                        return resolve(result);
                    }).catch((err2) => {
                        console.log(err2);
                        Promise.reject(err2);
                    });
                }
            });
        });
    }

    public updateData(collectionName: string, id: string, set: object) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            return client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    return db.db().collection(collectionName).updateOne({ _id: new ObjectId(id)}, set).then(result => {
                        console.log(
                            `${result.upsertedId} documents was updated with the _id`,
                          );
                        db.close();
                        return resolve(result);
                    }).catch((err2) => {
                        console.log(err2);
                        Promise.reject(err2);
                    });
                }
            });
        });
    }
}
