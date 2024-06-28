const Joi = require('joi');
const mongoose = require('mongoose');


const CompanySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    headOfficeAddress:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    },
    webSiteUrl:{
        type: String
    },
    logo:{
        type: Buffer
    },
    keyContactPerson:{
        type: Object,
        required: true
    },
    additionalInfo:{
        type: Object,
        required: true
    },
    productPortfolio:{
        type: Array,
        required: true
    },
    managementTeamDetails:{
        type: Array
    }

})

CompanySchema.index({ name: 1 });

CompanySchema.index({ country: 1 });
CompanySchema.index({ "productPortfolio.productName": 1 });

let keyContactPersonSchema = Joi.object({
    name: Joi.string().min(1).required(),
    designation: Joi.string().min(1).required(),
    countryCode:  Joi.string().min(3).max(5).required(),
    contactNo:  Joi.string().min(10).max(11).required(),
    email: Joi.string().required().email()
})

let addittionalInfoSchema = Joi.object({
    briefCompanyProfile: Joi.string().min(100).required(),
    socialMediaLink: Joi.string().optional(),
    vison_mission: Joi.string().optional()
})

let productPortFolioSchema = Joi.object({
    productName: Joi.string().min(1).required(),
    productPortFolioDescritption: Joi.string().min(1).required(),
    socialLink : Joi.string().optional()
})

let managementTeamDetails = Joi.object({
    name: Joi.string().optional(),
    designation: Joi.string().optional(),
    profileSummary : Joi.string().optional(),
    linkedInProfile: Joi.string().optional()
})

let companyJoiSchema = Joi.object({
    name: Joi.string().min(1).required(),
    headOfficeAddress: Joi.string().min(1).required(),
    country:  Joi.string().min(1).required(),
    postalCode:  Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    countryCode:  Joi.string().min(3).max(5).required(), // add regex
    contactNo:  Joi.string().min(10).max(11).required(), //add regex
    webSiteUrl:  Joi.string().optional(),
    logo: Joi.required(),
    keyContactPerson: keyContactPersonSchema,
    additionalInfo: addittionalInfoSchema,
    productPortfolio: Joi.array().items(productPortFolioSchema),
    managementTeamDetails: Joi.array().items(managementTeamDetails)
})





const Company = mongoose.model('Company', CompanySchema);

module.exports = {Company,companyJoiSchema};