const { UserPlan } = require('../models');

/**
 * Users Plans
 */
const userPlanExistById = async (id) => {
   // Verificar si el id existe
   const userPlanExist = await UserPlan.findById(id);
   if (!userPlanExist) {
      throw new Error(`El id no existe ${id}`);
   }
};

module.exports = {
   userPlanExistById,
};
