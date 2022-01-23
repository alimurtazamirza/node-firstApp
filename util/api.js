const { create } = require("apisauce");

// define the api
const api = create({
  baseURL: "http://115.186.58.47/mtn-marketplace2/rest/V1/",
  headers: { "Content-Type": "application/json" },
});

module.exports = api;
