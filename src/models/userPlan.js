const { Schema, model } = require('mongoose');

const UserPlanSchema = Schema({
   planCode: {
      type: String,
      required: [true, 'El código del plan es obligatorio'],
      // unique: true,
   },
   planPrice: {
      type: Number,
      required: [true, 'El precio del plan es obligatorio'],
      // unique: true,
   },
   planName: {
      type: String,
      required: [true, 'El nombre del plan es obligatorio'],
      // unique: true,
   },
   userRut: {
      type: String,
      required: [true, 'El rut es obligatorio'],
   },
});

UserPlanSchema.methods.toJSON = function () {
   const { __v, ...userPlan } = this.toObject();
   // userPlan._id = _id;
   return userPlan;
};

module.exports = model('UserPlan', UserPlanSchema);
