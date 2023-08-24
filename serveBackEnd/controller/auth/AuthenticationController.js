import { query } from 'express'
import handleAsync from 'express-async-handler'
import * as turf from '@turf/turf'
import User from '../../models/User.js'
import Role from '../../models/Role.js'
import jwt from 'jsonwebtoken';

import dotenv from "dotenv"

const verifyUser = handleAsync(async (req,res) => {
    dotenv.config();

    const filter = req.query

    if(filter.username && filter.password){
        const user = await User.findOne({username: filter.username, password: filter.password}).select().lean();
        const roles = await Role.find().select().lean();
        const userVerify = user ? true : false
        if(userVerify){
            const tokenForAccess = jwt.sign({
                'username': user.username
            }, process.env.ACCESS_TOKEN_SECRET , 
            {expiresIn: '60s'})

            const tokenForRefresh = jwt.sign({
                'username': user.username
            }, process.env.REFRESH_TOKEN_SECRET , 
            {expiresIn: '1d'})
            res.cookie('jwt', tokenForRefresh, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
            return res.json({tokenForAccess, tokenForRefresh, userVerify, user, roles})
        }
        else{
            res.sendStatus(401);
        }
    }
})

export default { verifyUser };