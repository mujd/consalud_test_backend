const { response } = require('express');
const { UserPlan } = require('../models');
const { clientPlansAxios, formatMoney } = require('../helpers');
const { localPlans } = require('../data');

const getAllConsaludPlans = async () => {
   try {
      return await clientPlansAxios.get('/planes');
   } catch (error) {
      console.error(error);
   }
};

const getConsaludPlansByPrice = async (req, res = response) => {
   try {
      const { price } = req.query;
      const _price = Number(price);
      const minPrice = _price - _price * 0.15;
      const maxPrice = _price + _price * 0.15;
      if (_price < 500000 || _price > 1000000) {
         return res.status(400).json({
            msg: `El precio $${formatMoney(
               _price
            )}, debe ser mayor a $500.000 y menor a $1.000.000`,
         });
      }
      // const cPlans = await getAllConsaludPlans();
      // console.log('PLANES__CONSALUD: ', cPlans);
      const filteredPlans = localPlans.filter(
         (lp) => lp.precio <= maxPrice && lp.precio >= minPrice
      );
      res.status(200).json({
         ok: true,
         minPrice,
         maxPrice,
         total: filteredPlans.length,
         filteredPlans,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al obtener los planes de consalud por precio',
      });
   }
};

const getAllUsersPlans = async (req, res = response) => {
   try {
      const { limit = 5, page = 0 } = req.query;

      const [total, usersPlans] = await Promise.all([
         UserPlan.countDocuments(),
         UserPlan.find().skip(Number(page)).limit(Number(limit)),
      ]);

      res.status(200).json({
         ok: true,
         total,
         usersPlans,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al obtener los planes del los usuarios',
      });
   }
};

const getUserPlan = async (req, res = response) => {
   try {
      const { id } = req.params;
      const userPlan = await UserPlan.findById(id);

      res.status(200).json({
         ok: true,
         userPlan,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al obtener el plan del usuario',
      });
   }
};

const createUserPlan = async (req, res = response) => {
   const body = req.body;
   try {
      const data = {
         planCode: body.planCode,
         planPrice: body.planPrice,
         planName: body.planName,
         userRut: body.rut,
      };
      const userPlan = new UserPlan(data);
      await userPlan.save();
      res.status(201).json({
         ok: true,
         userPlan,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al crear el plan al usuario',
      });
   }
};

const updateUserPlan = async (req, res = response) => {
   try {
      const { id } = req.params;
      const { ...data } = req.body;

      const plan = await UserPlan.findByIdAndUpdate(id, data, { new: true });

      res.status(200).json({
         ok: true,
         plan,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al actualizar el plan al usuario',
      });
   }
};

const deleteUserPlan = async (req, res = response) => {
   try {
      const { id } = req.params;
      const userPlanBorrado = await UserPlan.deleteOne({ _id: id });

      res.status(200).json({
         ok: true,
         userPlanBorrado,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Error al borrar el plan al usuario',
      });
   }
};

module.exports = {
   createUserPlan,
   getAllUsersPlans,
   getUserPlan,
   updateUserPlan,
   deleteUserPlan,
   getConsaludPlansByPrice,
};
