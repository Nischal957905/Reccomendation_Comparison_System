import { query } from 'express'
import mongoose from 'mongoose'
import handleAsync from 'express-async-handler'
import Post from '../../models/Post.js'
import College from '../../models/College.js'
import School from '../../models/School.js'
import Review from '../../models/Review.js'
import Institution from '../../models/Institution.js'
import User from '../../models/User.js'
import Comment from '../../models/Comment.js'

const deleteInstitution = handleAsync(async (req, res) => {
    if(req.query.delete !== '' && req.query.delete){
        const id = new mongoose.Types.ObjectId(req.query.delete)
        if(req.query.category === "consultancy"){
            //const review = await Review.findOneAndRemove({institution_code: id});
            //const data = await Institution.findByIdAndRemove({_id:id})
        }
        else if(req.query.category === "college"){
            //const data = await College.findByIdAndRemove({_id:id})
        }
        else if(req.query.category === "school"){
            //const data = await School.findByIdAndRemove({_id:id})
        }
    }
})

const editCollege = handleAsync(async (req, res) => {
    const institution = req.params.institution
    const params = req.query
    const id = new mongoose.Types.ObjectId(institution)
    const initialArray = await College.findOne({_id: id}).select().lean();

 
    if(req.query.edit){
        const id = new mongoose.Types.ObjectId(req.query.id)
        const findValue = {_id: id}
        const updatedValues = {
            name: params.name,
            location: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website_url: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            accreditation: params.accreditation === "Ugc" ? ' ✓ UGC Accredited' : "",
            ownership: params.ownership === "Private" ? " private Institution " : " community Institution ",
            established: params.established
        }

        const updateInstitution = await College.findOneAndUpdate(findValue, updatedValues,{
            new: true, 
        })
        return res.json(updateInstitution)
    }
    return res.json(initialArray)
})

const editConsultancy = handleAsync(async (req, res) => {
    const institution = req.params.institution
    const params = req.query
    const id = new mongoose.Types.ObjectId(institution)
    const initialArray = await Institution.findOne({_id: id}).select().lean();

    if(req.query.edit){
        const id = new mongoose.Types.ObjectId(req.query.id)
        const findValue = {_id: id}
        const updatedValues = {
            name: params.name,
            address: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            platform: params.platform,
            established: params.established,
            success: parseInt(params.success),
            universities: parseInt(params.university),
            online: params.online === "Online" ? true : false
        }
        const updateInstitution = await Institution.findOneAndUpdate(findValue, updatedValues,{
            new: true, 
        })
        return res.json(updateInstitution)
    }
    return res.json(initialArray)
})

const editSchool = handleAsync(async (req, res) => {
    const institution = req.params.institution
    const params = req.query
    const id = new mongoose.Types.ObjectId(institution)
    const initialArray = await School.findOne({_id: id}).select().lean();

    if(req.query.edit){
        console.log(req.query)
        const id = new mongoose.Types.ObjectId(req.query.id)
        const findValue = {_id: id}
        const updatedValues = {
            name: params.name,
            location: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website_url: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            accreditation: params.accreditation,
            ownership: params.ownership === "Private" ? " private Institution " : " community Institution ",
        }
        const updateInstitution = await School.findOneAndUpdate(findValue, updatedValues,{
            new: true, 
        })
        return res.json(updateInstitution)
    }
    return res.json(initialArray)
})

const getAdminShowCase = handleAsync(async (req, res) => {

    const page = req.query.page
    const institutionData = await Institution.find().select({name: 1, _id:1}).lean();
    const collegeData = await College.find().select({name: 1, _id: 1}).lean();
    const schoolData = await School.find().select({name: 1, _id: 1}).lean();

    const begining = (page - 1) * 20;
    const ending = page * 20;

    const structuredInstitution = institutionData.slice(begining, ending)
    const structuredCollege = collegeData.slice(begining, ending)
    const structuredSchool = schoolData.slice(begining, ending)
    const maxValue = Math.max(institutionData.length, collegeData.length, schoolData.length)
    const totalPage =  Math.ceil( maxValue / 20);

    return res.json({structuredInstitution, structuredCollege, structuredSchool, totalPage})
})

const createCollege = handleAsync(async (req, res) => {

    const params = req.query;

    if(params.address !== "" && params.address){

        const newInstitution = await College.create({

            name: params.name,
            location: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            accreditation: params.accreditation === "Ugc" ? ' ✓ UGC Accredited' : "",
            ownership: params.ownership === "Private" ? " private Institution " : " community Institution ",
            established: params.established

        })
    }
})

const createSchool = handleAsync(async (req, res) => {

    const params = req.query;

    if(params.address !== "" && params.address){

        const newInstitution = await School.create({
            name: params.name,
            location: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            accreditation: params.accreditation,
            ownership: params.ownership === "Private" ? " private Institution " : " community Institution ",
            established: params.established

        })
    }
})

const formatCapital =(word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
  
const createConsultancy = handleAsync(async (req, res) => {

    const params = req.query;

    if(params.address !== "" && params.address){

        const specialValue = params.specialization.split(',')
        const countryValue = params.country.split(',')
        const holiday = params.holidays.split(',')
        const holidaySet = holiday.map((item) =>  formatCapital(item))
        const countrySet = countryValue.map((item) => formatCapital(item))
        const newInstitution = await Institution.create({
            name: params.name,
            address: params.address,
            email: params.email,
            latitude: parseFloat(params.latitude),
            longitude: parseFloat(params.longitude),
            experience: parseInt(params.experience),
            phone: params.phone,
            website: params.website,
            opening_time: params.opening,
            closing_time: params.closing,
            platform: params.platform,
            established: params.established,
            specialization: specialValue,
            countries: countrySet,
            success: parseInt(params.success),
            universities: parseInt(params.university),
            holidays: holidaySet,
            online: params.online === "Online" ? true : false
        })
    }
})

export default { createCollege, createSchool, createConsultancy, getAdminShowCase, deleteInstitution, editCollege, editConsultancy, editSchool };