import { AsyncStorage } from 'react-native';

import { USER_KEY } from '../config';

export async function request(url, method = 'GET', body) {
    const token = await AsyncStorage.getItem(USER_KEY);
    if (token === null) {
        reject('token not found');
        return;
    }

    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/jsonp;odata=verbose'
        }
    };
    if (method === 'POST' && body) {
        options.body = JSON.stringify(body);
    }

    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}

export async function requestJson(url, method = 'GET', body) {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}
