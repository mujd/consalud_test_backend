const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
   getConsaludPlansByPrice,
   createUserPlan,
   getAllUsersPlans,
   getUserPlan,
   updateUserPlan,
   deleteUserPlan,
} = require('../controllers/usersPlans');

const { userPlanExistById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/plans
 */

//  Obtener todos los planes
router.get('/cPlans', getConsaludPlansByPrice);
router.get('/', getAllUsersPlans);

// Obtener una plan por id
router.get(
   '/:id',
   [
      check('id', 'No es un id de Mongo válido').isMongoId(),
      check('id').custom(userPlanExistById),
      validarCampos,
   ],
   getUserPlan
);

// Crear plan
router.post(
   '/',
   [
      check('planCode', 'El código del plan es obligatorio').not().isEmpty(),
      check('planName', 'El nombre del plan es obligatorio').not().isEmpty(),
      check('planPrice', 'El precio del plan es obligatorio').not().isEmpty(),
      check('rut', 'El rut del usuario es obligatorio').not().isEmpty(),
      validarCampos,
   ],
   createUserPlan
);

// Actualizar
router.put(
   '/:id',
   [
      // check('userPlan', 'No es un id de Mongo').isMongoId(),
      check('planCode', 'El código del plan es obligatorio').not().isEmpty(),
      check('planName', 'El nombre del plan es obligatorio').not().isEmpty(),
      check('planPrice', 'El precio del plan es obligatorio').not().isEmpty(),
      check('rut', 'El rut del usuario es obligatorio').not().isEmpty(),
      check('id').custom(userPlanExistById),
      validarCampos,
   ],
   updateUserPlan
);

// Borrar una plan
router.delete(
   '/:id',
   [
      check('id', 'No es un id de Mongo válido').isMongoId(),
      check('id').custom(userPlanExistById),
      validarCampos,
   ],
   deleteUserPlan
);

module.exports = router;
