import { Request, Response } from 'express';
import { setLanguaje , getLanguaje, getData, getMenu } from '../../simpleStorage';

export class IndexController {

    public root (request: Request, response: Response) {
        const languaje = request.query.lang as string || 'es';
        setLanguaje(languaje);
        response.redirect('/home?lang=' + languaje);
    }

    public home (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        const menu = getMenu(0, languaje);
        response.render('index', {"page_title": "Macquarie School of English", menu, data});
    }

}