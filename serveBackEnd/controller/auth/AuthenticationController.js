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
        const user = await User.findOne({username: filter.username, password: filter.password, status:"Active"}).select().lean();
        const userVerify = user ? true : false
        if(userVerify){
            const roles = await Role.findOne({_id: user.role_id}).select({role_name: 1}).lean();
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
        else if(!userVerify){
            return res.json("No user found")
        }
    }
})


const createUser = handleAsync(async (req,res) => {
    
    const data = req.query;
    if(data.location){
        const role = await Role.find({role_name: 'non-admin'}).select({_id: 1}).lean()
        const findUser = await User.findOne({username: data.username}).select().lean()
        if(!findUser){
            const newUser = await User.create({
                role_id: role._id,
                latitude: data.latitude,
                longitude: data.longitude,
                username: data.username,
                password: data.password,
                status: 'Active'
            })

            return res.json(newUser)
        }
        else{
            return res.json("user found")
        }
    }
})

export default { verifyUser, createUser };