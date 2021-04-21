const mongoose = require('mongoose');

const dbConnection = async () => {
   try {
      // mongodb://localhost:27017/consalud -> para usar mongo local
      await mongoose.connect('mongodb://mongodb/consalud', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      });

      console.log('Base de datos online');
   } catch (error) {
      console.log(error);
      throw new Error('Error al iniciar la base de datos');
   }
};

module.exports = {
   dbConnection,
};
