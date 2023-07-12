import express from 'express'
import institutionController from '../controller/InstitutionController.js'

const modemRoute = express.Router();

modemRoute.route('/')
    .get(institutionController.getInstitutionList)
    .post(institutionController.createInstitution)
    .patch(institutionController.updateInstitution)
    .delete(institutionController.deleteInstitution)

export default modemRoute;