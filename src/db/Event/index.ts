import { DbClient } from '../index';

export enum Languaje  {
    EN,
    ES
}

export type EventData = {
    _id: string,
    title: string,
    description: string,
    dueDate: string,
    languaje: Languaje
}

export default class Event {

    public static async fetch(lang?: string) {
        try {
            return new DbClient().fetchEvents("events", lang , 10).then((events) => {
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
            return new DbClient().fetchEvents("events", undefined, 100).then((events) => {
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
            const set = {$set:{title: event.title, description: event.description, dueDate: event.dueDate}};
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
