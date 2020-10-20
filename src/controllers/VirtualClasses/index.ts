import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';

export class VirtualClassesController {

    public getVirtualClasses (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        const menu = getMenu(2, languaje);
        response.render('virtual_classes', {"page_title": "Virtual Classes", menu, data});
    }

}