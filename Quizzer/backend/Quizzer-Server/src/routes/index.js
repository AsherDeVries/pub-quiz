import { version } from '../../package.json';
import { Router } from 'express';

export default () => {
	let api = Router();

	api.get('/', (req, res) => {
		res.send({ api_version: version });
	});

	return api;
}
