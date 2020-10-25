import fetch from 'cross-fetch';

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
    return fetch(path)
            // the JSON body is taken from the response
            .then(res => res.json())
            .then(res => {
                    return res as T
            });
}