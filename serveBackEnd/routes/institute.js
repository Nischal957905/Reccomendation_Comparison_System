/*
This file consists of different route per specific page. These routes will be utilized as a rest
api to connect mongo with fron-end react
*/

//necessary imports of epress modules and libraires including other custom made files
import express from 'express'
import institutionController from '../controller/InstitutionController.js'

//Initilization of express router modules to gain access to router
const modemRoute = express.Router();

//Declaration of the routes for this specific page pointing towards a method present in the controller
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