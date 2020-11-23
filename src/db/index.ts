import { MongoClient, Db } from "mongodb";
import { Hash , decrypt } from "./Crypto";
import * as fs from 'fs';

const DATABASE_NAME = "macquarieschool";

const hash: Hash = {
    iv: '45108a63ad989d891a100c3a39b4d310',
    content: '9a6000371e584c1f7ca2bb4f09340c3ab4bf4d8d2979c1dfcd6d4894b7add98939c3562fc7da698b848c96055396d1327b6f3be39062'
};



export class DbClient {

    private conectionUrl() {
        const text = fs.readFileSync('secrets.text');
        const textByLine = text.toString().split("\n");
        const descripted = decrypt(hash, textByLine[0]);
        return `mongodb+srv://${descripted}/${DATABASE_NAME}`;
    }

    public find(collectionName: string, name: string) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    const where = { "email": name };
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

    public getData(collectionName: string, limit: number= 20) {
        return new Promise((resolve, reject) => {
            const client = new MongoClient(this.conectionUrl(), { useUnifiedTopology: true });
            client.connect( (err, db) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.info('Database successfully connection!');
                    const where = { "date": { "$gte" :new Date().toISOString().slice(0, 24) + "" } };
                    db.db().collection(collectionName).find(where).sort('date', 1).limit(limit).toArray((err2, result) => {
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
