const { default: axios } = require('axios');

const clientPlansAxios = axios.create({
   baseURL: 'https://ua7bpp3ogg.execute-api.us-east-2.amazonaws.com/default',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
   },
});

module.exports = {
   clientPlansAxios,
};
