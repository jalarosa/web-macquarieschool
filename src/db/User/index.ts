import { DbClient } from '../index';
import { ExpirationStrategy, MemoryStorage } from "node-ts-cache";
const myCache = new ExpirationStrategy(new MemoryStorage());

export type User = {
    _id: string,
    email: string,
    hash: string
}

export default class UserDao {

    public static async fetchUser(email: string): Promise<User| void> {
        const key = `user-${email}`;
        const cacheUser = await myCache.getItem<User>(key);
        if (cacheUser) {
            return Promise.resolve(cacheUser);
        }
        try {
            const where = { email };
            return new DbClient().find("users", where).then((users) => {
                if (users) {
                    const user: User = users[0];
                    myCache.setItem(key, user, {  ttl: 900 });
                    return Promise.resolve(user);
                } else  Promise.reject('user doesnt exists');
            })
            .catch((err) => {
                console.log(err);
                Promise.reject(err);
            });
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }
}