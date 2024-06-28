const routes = require('express').Router();
const companyRoute = require('../controller/company');
routes.post('/companies', companyRoute.addCompanyDetails);
routes.get('/companies', companyRoute.getCompanyDetails)


module.exports = routes