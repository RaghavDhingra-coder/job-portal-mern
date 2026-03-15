import Company from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// in register company we will just ask name of the company
export const registerCompany = async (req, res) => {
    try {
        // we have taken name of company from user
        const { name } = req.body

        // if name is not provided by user
        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        // we check if a company already exists with the same name
        let company = await Company.findOne({ name })

        if (company) {
            return res.status(400).json({
                message: "Company already exists with this name",
                success: false
            })
        }
        // we create a row in the table with name and if of user who has created the company
        company = await Company.create({
            name: name,
            userId: req.id
        })

        // we send company and a message that company registered successfully
        return res.status(201).json({
            message: "Company Registered Successfully",
            company,
            success: true
        })

    }
    catch (err) {
        console.log(err)
    }
}

// this funtion will give all companies created by a user by the if of the user
export const getCompany = async (req, res) => {
    try {

        const userId = req.id
        // we find all companies associated with the user id it will return array of companies
        const companies = await Company.find({ userId })

        // we will return the companies
        return res.status(200).json({
            companies,
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}

// we provid company if and it will give the copmpany associated with that id
export const getCompanyById = async (req, res) => {
    try {
        // we take company id from user in params
        const companyId = req.params.id
        // we find company with that id
        const company = await Company.findById(companyId)

        // if company does not exists with that id i return messga ethat company not found
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        // return the company
        return res.status(200).json({
            company,
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}

// this function will help in upodatuing company or adding more feilds then just name and userid
export const updateCompany = async (req, res) => {
    try {
        // take this from user
        const { name, description, website, location } = req.body

        const file = req.file

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url

        const updatedData = { name, description, website, location,logo }

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        // Without new: true
        // What happens:

        // Document is updated in database.

        // But the function returns the old document (before update).

        // With new: true
        // Now Mongoose returns the updated document.



        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true
        })
    }

    catch (err) {
        console.log(err)
    }
}