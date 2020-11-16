import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';
import Event from '../../db/Event'
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

}