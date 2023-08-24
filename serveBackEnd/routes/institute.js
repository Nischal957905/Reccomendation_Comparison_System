//necessary imports of epress
import express from 'express'
import institutionController from '../controller/InstitutionController.js'

//initializeing an express router
const modemRoute = express.Router();

//defining base route and different routes for the different methods exsiting in the controller.
modemRoute.route('/')
    .get(institutionController.getInstitutionList)
    .post(institutionController.createInstitution)
    .patch(institutionController.updateInstitution)
    .delete(institutionController.deleteInstitution)

modemRoute.route('/:institution')
    .get(institutionController.getSingleInstitution)
    .post(institutionController.createReviewRating)
    //exporting the router instance to utilize in the main app
export default modemRoute;