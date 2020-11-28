import { DbClient } from '../index';
import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";
const myCache = new ExpirationStrategy(new MemoryStorage());

export type EventData = {
    _id: string,
    title: string,
    description: string,
    date: string
}

export default class Event {

    public static async fetch() {
        const cacheEvents = await myCache.getItem<EventData>("events");
        if (cacheEvents) {
            return cacheEvents;
        }
        try {
            return new DbClient().getData("events", 10).then((events) => {
                myCache.setItem("events", events, {  ttl: 86400 });
                return new Promise((resolve, reject) => resolve(events));
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }

    public static async fetchAll() {
        try {
            return new DbClient().getData("events", 100).then((events) => {
                return new Promise((resolve, reject) => resolve(events));
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }

    public static async insert(eventData: EventData) {
        try {
            return new DbClient().insertData("events", eventData).then(() => {
                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }

    public static async delete(id: string) {
        try {
            return new DbClient().deleteData("events", id).then(() => {
                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }

    public static async save(event: EventData) {
        try {
            const set = {$set:{title: event.title, description: event.description, date: event.date}};
            return new DbClient().updateData("events", event._id, set).then(() => {
                return Promise.resolve();
            })
            .catch((err) => {
                console.log(err);
                Promise.reject(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }
}
