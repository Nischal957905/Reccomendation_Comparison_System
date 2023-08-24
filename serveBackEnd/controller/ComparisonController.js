import Institution from '../models/Institution.js'
import College from '../models/College.js'
import Review from '../models/Review.js'
import handleAsync from 'express-async-handler'
import * as turf from '@turf/turf'

const servicePointHandler = (university,country, speciality, totalUni, totalCountry, totalSpecial, count) => {
    let points = 0;
    const universityAverage = totalUni / count;
    const countryAverage = totalCountry / count;
    const specialAverage = totalSpecial/count;

    const percentUniversity = universityAverage * .45;
    const percentCountry = countryAverage * .35;
    const percentSpecial = specialAverage * .20;

    points = (percentCountry * country / countryAverage) + 
        (percentUniversity * university / universityAverage) +
        (percentSpecial * speciality / specialAverage)

    return points * 20;
}

const experiencePointHandler = (totalExp, totalSucess, exp, success, count) => {
    let points;
    const expPoint = exp === "" ? 0 : exp
    const successPoints = success === "" ? 0 : success

    const expAverage = totalExp / count;
    const successAverage = totalSucess / count;

    const percentExp = expAverage * .50;
    const percentSuccess = successAverage * .50;

    points = (percentExp * exp / expAverage) + (percentSuccess * success / successAverage)

    return points * 20;
}

const experienceCollegePointHandler = (totalExp, exp,count, ugc) => {
    let points;
    const expPoint = exp === "" ? 0 : exp
    const ugcPoint = ugc === " ✓ UGC Accredited" ? 13 : 3

    const expAverage = totalExp / count;

    const percentExp = expAverage * .70;
    const percentUgc = ugcPoint * .30;

    points = (percentExp * exp / expAverage) + (percentUgc)

    return points * 20;
}

const timeManipulator = (time) => {
    if(time.includes(":")){
        return parseInt(time.split(":")[0])
    }
    else{
        return parseInt(time)
    }
}

const accessPointHandler = (opTime, clTime, online, platform) => {


    let openingTime = timeManipulator(opTime);
    let closing_time = timeManipulator(clTime);
    if(closing_time < 10){
        closing_time = closing_time + 12;
    }
    const operatingHours = closing_time - openingTime;
    const operatingPoints = operatingHours * 5;

    if(platform !== "jirok") {

        const onlinePoints = online === true ? 5 : 2;
        const pointsOnline = onlinePoints * 2.5;
        const platformPoints = platform === 'Gobal' ? 5 : 2;
        const pointsPlatform = platformPoints * 2.5;
        return pointsOnline + operatingPoints + pointsPlatform;
    }

    else if(platform === "jirok"){

        const onlinePoints = online === " community Institution " ? 10 : 5;
        const pointsOnline = onlinePoints * 5;

        return pointsOnline + operatingPoints;
    }
    
}


const getCompany = handleAsync(async (req, res) => {
    try {
      const companyId = req.params.id
      console.log(companyId)
      return res.json("hello")
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const getComparison = handleAsync(async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).json({error: 'Page not found'});
    }
})

const applyDistanceFilter = (useLat,useLong,lat,long) => {

    if(lat !== '' && long !== ''){
        let distanceOne = turf.point([useLat,useLong])
        let distanceTwo = turf.point([lat,long])
        let options = {units: 'metres'};
        let distance = turf.distance(distanceOne, distanceTwo, options)  
        return distance;
    }
    else{
        return "";
    }
}

const reviewPointHandler = (reviews) => {

    let totalReviews = reviews.length;
    if(totalReviews === 0){
        return 0;
    }
    let ratingPointsTotal = 0;
    reviews.forEach(element => {
        const rating = element.rating;
        ratingPointsTotal += rating;
    });
    
    let points = (ratingPointsTotal /totalReviews ) + totalReviews
    return points * 10;
}

const getComparisonList = handleAsync(async (req, res) => {

    const insObject = req.query
    let fullObject = [];
    let scoreObject = [];
    let fullReviews = [];
    //Service Oriented
    let totalUniPoint = 0;
    let totalCountryCount = 0;
    let totalSpecialCount = 0;

    //Experience Oriented
    let totalExpPoint = 0;
    let totalSucessPoint = 0;

    if(Object.keys(insObject).length !== 0){
        for(let iterator in insObject){
            if(insObject.hasOwnProperty(iterator)){
                const comparisonInstitution = await Institution.find(
                    {name: insObject[iterator]}).select().lean()
                fullObject.push(comparisonInstitution[0])

                const reviews = await Review.find({
                    institution_code: comparisonInstitution[0]._id
                }).select().lean()
                fullReviews.push(reviews)
            }
        }
    }  

    if(fullObject.length > 0){
        fullObject.forEach((item,index) => {
            
            totalUniPoint += item.universities
            totalCountryCount += item.countries.length
            totalSpecialCount += item.specialization.length
            if(item.experience === ""){
                totalExpPoint = totalExpPoint + 0;
            }
            if(item.success === ""){
                totalSucessPoint = totalSucessPoint + 0;
            }
            else if(item.experience !== "" || item.success !== ""){
                totalExpPoint += item.experience;
                totalSucessPoint += item.success;
            }
        });
    }
    
    if(fullObject.length > 0){
        fullObject.forEach((item,index) => {
            const reviews = fullReviews[index]

            const reviewPoint = reviewPointHandler(
                reviews
            )
            const servicePoint = servicePointHandler(
                item.universities, 
                item.countries.length, 
                item.specialization.length, 
                totalUniPoint,
                totalCountryCount,
                totalSpecialCount,
                fullObject.length
            );
            
            const expPoint = experiencePointHandler(
                totalExpPoint,
                totalSucessPoint,
                item.experience,
                item.success,
                fullObject.length,
            )

            const accessPoint = accessPointHandler(
                item.opening_time,
                item.closing_time,
                item.online,
                item.platform,
            )

            const userLat = 27.6948534;
            const userLong = 85.3049344;
            const distance = applyDistanceFilter(
                userLat,
                userLong,
                item.latitude,
                item.longitude,
            )

            scoreObject.push({
                index: index + 1,
                service: servicePoint,
                experience: expPoint,
                access: accessPoint,
                institution: item,
                distanceMetre: distance,
                review: reviewPoint,
            })
        });
    }

    const institutions = await Institution.find().select().lean();
    const institutionsName = await Institution.distinct('name').lean();

    if(fullObject.length > 0){
        return res.json({institutions, institutionsName,scoreObject})
    }
    return res.json({institutions, institutionsName})
})

const getCollegeComparisonList = handleAsync(async (req, res) => {

    const insObject = req.query
    let fullObject = [];
    let scoreObject = [];

    //Experience Oriented
    let totalExpPoint = 0;

    if(Object.keys(insObject).length !== 0){
        for(let iterator in insObject){
            if(insObject.hasOwnProperty(iterator)){
                const comparisonInstitution = await College.find(
                    {name: insObject[iterator]}).select().lean()
                fullObject.push(comparisonInstitution[0])
            }
        }
    }  
    
    if(fullObject.length > 0){
        fullObject.forEach(item => {
            if(item.experience === ""){
                totalExpPoint = totalExpPoint + 0;
            }
            else if(item.experience !== ""){
                totalExpPoint += item.experience;
            }
        });
    }
    
    if(fullObject.length > 0){
        fullObject.forEach((item,index) => {
            
            const expPoint = experienceCollegePointHandler(
                totalExpPoint,
                item.experience,
                fullObject.length,
                item.ugc,
            )

            const accessPoint = accessPointHandler(
                item.opening_time,
                item.closing_time,
                item.ownership,
                "jirok"
            )

            const userLat = 27.6948534;
            const userLong = 85.3049344;
            const distance = applyDistanceFilter(
                userLat,
                userLong,
                item.latitude,
                item.longitude,
            )

            scoreObject.push({
                index: index + 1,
                experience: expPoint,
                access: accessPoint,
                institution: item,
                distanceMetre: distance
            })
        });
    }

    const institutions = await College.find().select().lean();
    const institutionsName = await College.distinct('name').lean();

    if(fullObject.length > 0){
        return res.json({institutions, institutionsName,scoreObject})
    }
    return res.json({institutions, institutionsName})
})


export default {getComparisonList, getCompany, getComparison, getCollegeComparisonList};