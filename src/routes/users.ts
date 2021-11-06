import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/users';

const routes = express.Router();

routes.get('/', getUsers);
routes.post('/', createUser);
routes.get('/:id', getUser);
routes.put('/:id', updateUser);
routes.delete('/:id', deleteUser);

export default routes;
