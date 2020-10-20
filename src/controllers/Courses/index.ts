import { Request, Response } from 'express';
import { setLanguaje , getLanguaje, getData, getMenu } from '../../simpleStorage';

export class CoursesController {

    public getCourses (request: Request, response: Response) {
        const languaje = request.query.lang as string || getLanguaje();
        const data = getData(languaje);
        const menu = getMenu(1, languaje);
        response.render('courses', {"page_title": "Courses", menu, data});
    }

}