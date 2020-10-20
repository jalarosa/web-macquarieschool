import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';

export class EventsController {

    public getEvents (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        const menu = getMenu(4, languaje);
        response.render('events', {"page_title": "Events", menu, data});
    }

}