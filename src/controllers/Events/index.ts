import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';
import Event , { EventData } from '../../db/Event';

export class EventsController {


    public async getEvents (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        Event.fetch().then((events) => {
            response.render('events', {"page_title": "Events", data, "events": events});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async getAllEvents (request: Request, response: Response) {
        Event.fetch().then((events) => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(events));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async putEvents (request: Request, response: Response) {
        const eventChanged = request.body as EventData
        Event.save(eventChanged).then(() => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({message: "ok"}));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async postEvents (request: Request, response: Response) {
        const eventChanged = request.body as EventData
        Event.insert(eventChanged).then(() => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({message: "ok"}));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public async deleteEvents (request: Request, response: Response) {
        const id = request.params.id;
        Event.delete(id).then(() => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({message: "ok"}));
        })
        .catch((err) => {
            console.log(err);
        });
    }
}