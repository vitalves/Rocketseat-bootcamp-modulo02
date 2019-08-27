import { Router } from 'express';
// const { Router } = require("express");

// import para o teste:
// import User from './app/models/Users';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// middleware
import authMiddleware from './app/moddlewares/auth';

const routes = new Router();

/* rota pra teste:
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Diego Ferna',
    email: 'diego2@diego.com',
    password_hash: '1231231321',
  });

  return res.json(user);
}); */

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// usar middleware para evitar que essa rota seja acessada sem autenticacao
/*
OBS: o middleware pode ser usado localmente dentro da rota. EX:
routes.put('/users', authMiddleware, UserController.update)
*/
// Middleware GLOBAL:
routes.use(authMiddleware); // so vai valer p/ as rotas que vem apos ele
// rotas para baixo exigem autenticacao 'Bearer Authentication token'
routes.put('/users', authMiddleware, UserController.update);

/* antes do sucrase:
module.exports = routes; */
export default routes;
