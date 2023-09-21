import axios from 'axios';

const url = 'https://demo.martian.services/api';
const token = 'bWFydGlhbmFuZG1hY2hpbmU=';
const app = axios.create({
	baseURL: url,
	timeout: 8000,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Headers': 'x-access-token',
		'X-Auth': token,
	},
});

export default app;
