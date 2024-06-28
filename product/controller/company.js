const { Company, companyJoiSchema } = require('../model/company');
const companyRouter = require('express').Router();
const _ = require('lodash');
const limit = parseInt(process.env.limit);


companyRouter.addCompanyDetails = async (req, res) => {
    try {

        const { error } = companyJoiSchema.validate(req.body);
        if (error) res.status(400).json({ message: error.details[0].message });


        let company = new Company(_.pick(req.body, ["name", "headOfficeAddress", "country", "postalCode", "city", "countryCode", "contactNo", "webSiteUrl", "logo", "keyContactPerson", "additionalInfo", "productPortfolio", "managementTeamDetails"]))

        await company.save();

        res.status(200).json({ message: "Company details saved successfully" });

    } catch (err) {
        console.log("Errorn in companyRouter", err);
        res.status(502).json({ message: "Something went wrong" });
    }
}


companyRouter.getCompanyDetails = async (req, res) => {
    try {
        let reqQuery = req.query
        let pageNo = reqQuery.pageNo || 1;

        const calSkip = (pageNo - 1) * limit;

        let pipeline = [];

        if (reqQuery.sortKey) {
            let sortKey = reqQuery.sortKey
            let sortOrder = reqQuery.sortOrder;
            let order = sortOrder == 'asc' ? 1 : -1;
            let obj = {};
            obj[sortKey] = order;
            pipeline.push({ '$sort': obj });
        }

        const pagination = [{
            $skip: calSkip
        },
        {
            $limit: limit
        }]

        pipeline.push(...pagination);

        let companyDetails = await Company.aggregate(pipeline);

        return res.status(200).json({ message: "Success", data: companyDetails });
    } catch (err) {
        console.log("Errorn in get company details", err);
        res.status(502).json({ message: "Something went wrong" });
    }
}





module.exports = companyRouter;
