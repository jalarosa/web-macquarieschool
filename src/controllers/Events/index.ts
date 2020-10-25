import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';
import * as RemoteAPI from '../../RemoteAPI';
import { Events } from '../../models/events';

const URL = "https://glacial-basin-49699.herokuapp.com/events";

export class EventsController {


    public async getEvents (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        RemoteAPI.get<Events>(URL).then((dataEvents) => {
            response.render('events', {"page_title": "Events", data, "events": dataEvents.results});
            return 456;
        })
        .catch((err) => {
            console.log(err);
        });
    }

}