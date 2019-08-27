import express from 'express';
// importa o path para trabalhar com caminhos dos arquivos
import path from 'path';
import routes from './routes';

// importa o database
import './database';

/* Antes do sucrase:
const express = require("express");
const routes = require("./routes");
*/

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    // express.static: servir aquivos estaticos
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
