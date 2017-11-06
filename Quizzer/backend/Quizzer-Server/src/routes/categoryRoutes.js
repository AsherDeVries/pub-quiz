import { version } from '../../package.json';
import { Router } from 'express';
import CategoryModel from '../models/Category'

export default () => {
	let category = Router();

	// perhaps expose some API metadata at the root
	category.get('/', (req, res) => {

    CategoryModel.find({}).then(data => {
      res.send(data);
    }).catch(err => {
      throw new Error ('Can not retrieve categories from db');
    });
	});

	return category;
}