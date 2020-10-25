import fetch from 'cross-fetch';

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
    return fetch(path)
            // the JSON body is taken from the response
            .then(res => res.json())
            .then(res => {
                    // The response has an `any` type, so we need to cast
                    // it to the `User` type, and return it from the promise
                    return res as T
            });
}