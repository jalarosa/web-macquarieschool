import { Request, Response } from 'express';

export class AssetsController {

    public getCSS (request: Request, response: Response) {
        console.log("remaining - " + request.params.remaining);
        response.sendFile(__dirname + "../../assets/css/" + request.params.remaining);
    }

    public getJS (request: Request, response: Response) {
        console.log("remaining - " + request.params.remaining);
        response.sendFile(__dirname + "../../assets/js/" + request.params.remaining);
    }

    public getImages (request: Request, response: Response) {
        console.log("remaining - " + request.params.remaining);
        response.sendFile(__dirname + "../../assets/images/" + request.params.remaining);
    }

    public getGreensock (request: Request, response: Response) {
        console.log("remaining - " + request.params.remaining);
        response.sendFile(__dirname + "../../assets/js/greensock/" + request.params.remaining );
    }

}