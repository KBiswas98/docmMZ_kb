import {urls} from './constants';
//todo: load api-key
let API_KEY = '';

export const GET = async url => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  })
    .then(response => response.json()) // returns promise
    .then(responseJson => {
      return responseJson;
    });
};

export const POST = (url, body) => {
  console.log('test' + url);
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: body,
  })
    .then(response => response.json()) // returns promise
    .then(responseJson => {
      return responseJson;
    });
};
