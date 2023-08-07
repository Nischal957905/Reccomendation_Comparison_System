import Institution from '../models/Institution.js'
import handleAsync from 'express-async-handler'

// @desc get all institution
// @route GET/institution
// @private
//This is the controller function that is responsible for providing the required data of the insittuion 
//to the frontend
const getInstitutionList = handleAsync(async (req, res) => {
    const filter = req.query
    const dummyFilter = {
        country: 'educationasia.com',
        location: '  info@educationasia.com',
        university: '  Level 5 Share Market Complex Putalisadak'
    }
    let institutions;
    institutions = await Institution.find().select().lean();
    const countryValid = await Institution.distinct('countries').lean(); 
    const countries = countryValid.filter((country) => country !== "");
    const speciality = await Institution.distinct('specialization').lean(); 
    const emails = await Institution.distinct('email').lean(); 
    //const eachCountries= await Institution.distinct('countries').select().lean();
    const isAllEmpty = Object.values(dummyFilter).every((value) => value === '');
    let status = false

    if((filter.email && filter.email !== "") && (filter.speciality && filter.speciality !== "")  && (filter.country && filter.country !== "")){
        const arrayCountry = filter.email;
        const seperateString = arrayCountry.split(',');
        const arraySpecial = filter.speciality;
        const seperateSpecial = arraySpecial.split(',');
        const arrayCountrys = filter.country;
        const seperateCountry= arrayCountrys.split(',');
        institutions = await Institution.find({
            email: {$in: seperateString},
            specialization: {$in: seperateSpecial},
            countries: { $in: seperateCountry}
        }).select().lean();
        status = true
    }

    else if((filter.email && filter.email !== "") && (filter.speciality && filter.speciality !== "")){
        const arrayCountry = filter.email;
        const seperateString = arrayCountry.split(',');
        const arraySpecial = filter.speciality;
        const seperateSpecial = arraySpecial.split(',');
        institutions = await Institution.find({
            email: {$in: seperateString},
            specialization: {$in: seperateSpecial}
        }).select().lean();
        status = true
    }

    else if((filter.email && filter.email !== "") && (filter.country && filter.country !== "")){
        const arrayCountry = filter.email;
        const seperateString = arrayCountry.split(',');
        const arraySpecial = filter.country;
        const seperateSpecial = arraySpecial.split(',');
        institutions = await Institution.find({
            email: {$in: seperateString},
            countries: {$in: seperateSpecial}
        }).select().lean();
        status = true
    }

    else if((filter.country && filter.country !== "") && (filter.speciality && filter.speciality !== "")){
        const arrayCountry = filter.country;
        const seperateString = arrayCountry.split(',');
        const arraySpecial = filter.speciality;
        const seperateSpecial = arraySpecial.split(',');
        institutions = await Institution.find({
            countries: {$in: seperateString},
            specialization: {$in: seperateSpecial}
        }).select().lean();
        status = true
    }

    else if(filter.email && filter.email !== ""){
        const arrayCountry = filter.email;
        const seperateString = arrayCountry.split(',');
        institutions = await Institution.find({
            email: {$in: seperateString}
        }).select().lean();
        status = true
    }

    else if(filter.speciality && filter.speciality !== ""){
        const arraySpecial = filter.speciality;
        const seperateString = arraySpecial.split(',');
        institutions = await Institution.find({
            specialization: {$in: seperateString}
        }).select().lean();
        status = true
    }

    else if(filter.country && filter.country !== ""){
        const arraySpecial = filter.country;
        const seperateString = arraySpecial.split(',');
        institutions = await Institution.find({
            countries: {$in: seperateString}
        }).select().lean();
        status = true
    }

    if(!institutions) {
        return res.status(400).json({message: 'No Institution found'})
    }
    else {
        return res.json({institutions, countries, emails, status, speciality})
    }
})

// @desc create new institution
// @route POST/institution
// @private
const createInstitution = handleAsync(async (req, res) => {

})

// @desc update institution
// @route PATCH/institution
// @private
const updateInstitution = handleAsync(async (req, res) => {

})


// @desc  delete institution
// @route DElETE/institution
// @private
const deleteInstitution = handleAsync(async (req, res) => {

})

export default { getInstitutionList, createInstitution, updateInstitution, deleteInstitution, };