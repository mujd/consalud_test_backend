const formatMoney = (input, fractionDigits = 0) => {
   const numberFormat = new Intl.NumberFormat('de-DE', {
      style: 'decimal',
      //currency: 'CLP',
      minimumFractionDigits: fractionDigits,
   });
   return numberFormat.format(input);
};

module.exports = {
   formatMoney,
};
