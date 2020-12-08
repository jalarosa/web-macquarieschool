import { Request, Response } from 'express';
import { setLanguaje , getLanguaje, getData, getMenu } from '../../simpleStorage';
import Event , { EventData } from '../../db/Event';

export class IndexController {

    public root (request: Request, response: Response) {
        const languaje = request.query.lang as string || 'es';
        setLanguaje(languaje);
        const data = getData(languaje);
        const menu = getMenu(0, languaje);
        Event.fetch(languaje.toUpperCase()).then((events) => {
            response.render('index', {"page_title": "Macquarie School of English", menu, data, "events": events});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    public getHome (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        response.render('home', {data});
    }

}