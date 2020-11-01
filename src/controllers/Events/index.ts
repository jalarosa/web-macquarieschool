import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';
import * as RemoteAPI from '../../RemoteAPI';
import { Events } from '../../models/events';
import { EventService } from './EventService';

const eventService = new EventService();

export class EventsController {


    public async getEvents (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        eventService.getEvents().then((dataEvents) => {
            response.render('events', {"page_title": "Events", data, "events": dataEvents.results});
        })
        .catch((err) => {
            console.log(err);
        });
    }

}