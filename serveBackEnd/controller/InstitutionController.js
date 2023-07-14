import Institution from '../models/Institution.js'
import handleAsync from 'express-async-handler'

// @desc get all institution
// @route GET/institution
// @private
const getInstitutionList = handleAsync(async (req, res) => {
    const institution = await Institution.find().select().lean();
    if(!institution) {
        return res.status(400).json({message: 'No Institution found'})
    }
    else {
        return res.json(institution)
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

export default { getInstitutionList, createInstitution, updateInstitution, deleteInstitution };