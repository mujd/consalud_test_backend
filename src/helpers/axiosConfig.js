const { default: axios } = require('axios');

const clientPlansAxios = axios.create({
   baseURL: 'https://f3ec8e44-0529-430b-8433-d492dba0797c.mock.pstmn.io',
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
   },
});

module.exports = {
   clientPlansAxios,
};
