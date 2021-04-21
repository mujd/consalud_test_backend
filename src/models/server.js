const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
   constructor() {
      this.app = express();
      this.port = 8080;

      this.paths = {
         usersPlans: '/api/usersPlans',
      };

      // Conectar a base de datos
      this.conectarDB();

      // Middlewares
      this.middlewares();

      // Rutas de mi aplicación
      this.routes();
   }

   async conectarDB() {
      await dbConnection();
   }

   middlewares() {
      this.app.use(cors());
      this.app.use(express.json());
   }

   routes() {
      this.app.use(this.paths.usersPlans, require('../routes/usersPlans'));
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Servidor corriendo en puerto', this.port);
      });
   }
}

module.exports = Server;
