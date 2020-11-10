import { DbClient } from '../index';
import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";
const myCache = new ExpirationStrategy(new MemoryStorage());

export type EventData = {
    _id: string,
    title: string,
    description: string
}

class Event {

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
}

export default Event;