import { Request, Response } from 'express';
import { getLanguaje, getData, getMenu } from '../../simpleStorage';

export class VirtualClassesController {

    public getVirtualClasses (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        response.render('virtual_classes', {"page_title": "Virtual Classes", data});
    }

}