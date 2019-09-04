/* Esse arquivo processa a fila
 * Sera executada em separada da aplicacao
 * exemplo: node src/queue.js (esse arquivo)
 * OBS: precisa configurar o Sucrase no Package.json:
 "scripts": { //adiciona// ~> "queue": "nodemon src/queue.js";
 */

import Queue from './lib/Queue';

Queue.processQueue();
