import { Request, Response } from 'express';

export class AuthenticationController {

    public authentication (request: Request, response: Response) {
        const bodyContent = {
            email: request.body.email,
            password: request.body.password
        };
        console.log(`${bodyContent.email}` );
        const result = { success: bodyContent.email === 'test@email.com' && bodyContent.password === 'test' , message: 'ok'};
        if(!result.success) {
            result.message = 'Email or password is incorrect';
        }
        response.send(result);
    }

}