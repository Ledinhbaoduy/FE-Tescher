


export const LOCALHOST = 'http://localhost:3001';

const apiVersion = '';

let isProduction = true;

export const prod = 'https://anstudying.herokuapp.com/api'

const dev = LOCALHOST + '/api';

const http = isProduction ? prod : dev;

export const baseURL = http + apiVersion;
