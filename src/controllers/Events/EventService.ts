import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";
import { Events } from '../../models/events'
import * as RemoteAPI from '../../RemoteAPI';

const myCache = new ExpirationStrategy(new MemoryStorage());
const URL = "https://glacial-basin-49699.herokuapp.com/events";

export class EventService {

    public async getEvents(): Promise<Events> {
        const cacheEvents = await myCache.getItem<Events>("events");
        if (cacheEvents) {
            return cacheEvents;
        }

        await RemoteAPI.get<Events>(URL).then((dataEvents) => {
            myCache.setItem("events", dataEvents, {  ttl: 86400 });
            console.log(dataEvents);
            return dataEvents;
        })
        .catch((err) => {
            console.log(err);
        });
    }
}