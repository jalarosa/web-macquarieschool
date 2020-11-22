import { Request, Response } from 'express';
import { decrypt, Hash } from '../../db/Crypto';
import UserDao, { User } from '../../db/User';
import { TokenGenerator } from '../Token';

const hash: Hash = {
    iv: '45108a63ad989d891a100c3a39b4d310',
    content: '9a6000371e584c1f7ca2bb4f09340c3ab4bf4d8d2979c1dfcd6d4894b7add98939c3562fc7da698b848c96055396d1327b6f3be39062'
};

export class AuthenticationController {


    public authentication (request: Request, response: Response) {
        const bodyContent = {
            email: request.body.email,
            password: request.body.password
        };
        console.log(`${bodyContent.email}` );
        UserDao.fetchUser(bodyContent.email).then( (user: User) => {
            const descripted = decrypt(hash, bodyContent.password);
            const tkn = TokenGenerator.generate();
            console.log(tkn);
            const result = { success: bodyContent.email === user.email && descripted === user.hash , message: 'ok', token: tkn};
            if(!result.success) {
                result.message = 'Email or password is incorrect';
            } else {
                response.statusCode = 200;
                response.send(result);
            }
        })

    }

}