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

    public async postEvents (request: Request, response: Response) {
        const event = request.body as EventData
        Event.insert(event).then((events) => {
            response.setHeader('Content-Type', 'application/json');
            response.end({message: "ok"});
        })
        .catch((err) => {
            console.log(err);
        });
    }

}