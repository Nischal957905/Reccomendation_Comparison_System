import  { useParams } from 'react-router-dom'
import { useGetSingleInstitutionQuery, usePostReviewQuery } from "../../app/api/appSlice"
import GoogleMap from '../../components/utilities/GoogleMap';
import { useState, useEffect } from 'react';
import Rating from "@mui/material/Rating";
import useAuthentication from '../../components/hooks/useAuthentication';

export default function InstitutionPage() {

    const { institution } = useParams();
    const { valueForAuth } = useAuthentication()
    const [delayedData, setDelayedData] = useState({})
    
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSingleInstitutionQuery(institution);

    const [reviewData, setReviewData] = useState({
        'username' : valueForAuth.username,
        'rating': 0,
        'review': '',
        'institution': null
    })

    useEffect(() => {
        if(isSuccess){
            setReviewData((prevVal) => {
                return {
                    ...prevVal,
                    'institution' : data.institutionData._id
                }
            })
        }
    }, [isSuccess])

    const {
        data: dataReview,
        isLoading: loaded,
        isSuccess: success,
        isError: errors,
    } = usePostReviewQuery({institution, delayedData})
    //console.log(reveiwData.positiveReview)

    
    const renderPositiveReview = success && dataReview.status && dataReview?.positiveReview.length > 0 ?
            dataReview?.positiveReview.map((item,index) => {
                return (
                    <div className='each-review' key={index}>
                        <div>{item.review}</div>
                        <div>{item.username}</div>
                        <div>{item.rating}</div>
                    </div>
                )
            })
        : isSuccess && data?.positiveReview.length > 0 ? 
            data.positiveReview.map((item,index) => {
                return (
                    <div className='each-review' key={index}>
                        <div>{item.review}</div>
                        <div>{item.username}</div>
                        <div>{item.rating}</div>
                    </div>
                )
        }): null

    const renderNegativeReview = success && dataReview.status && dataReview?.negativeReview.length > 0 ?
        dataReview?.negativeReview.map((item,index) => {
            return (
                <div className='each-review' key={index}>
                    <div>{item.review}</div>
                    <div>{item.username}</div>
                    <div>{item.rating}</div>
                </div>
            )
        })
    : isSuccess && data?.negativeReview.length > 0 ? 
        data.negativeReview.map((item,index) => {
            return (
                <div className='each-review' key={index}>
                    <div>{item.review}</div>
                    <div>{item.username}</div>
                    <div>{item.rating}</div>
                </div>
            )
    }): null


    const handleOnSubmit = (event) => {
        event.preventDefault()
        setDelayedData(reviewData)
    }

    const ratingHandleChange = (event,newValue) => {
        setReviewData((prevVal) => {
            return {
                ...prevVal,
                'rating' : newValue,
            }
        })
    }

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setReviewData((prevVal) => {
            return {
                ...prevVal,
                [name] : value,
            }
        })
    }

    let imagesDirectory;
    let hasJapan;
    let hasKorea;
    let hasAustralia;
    let hasUSA;
    let hasUK;

    if(data){
        imagesDirectory = `/images/${data.institutionData.name.replace(/ /g, "_")}`;
        hasKorea = data.institutionData.countries.includes('South Korea');
        hasJapan = data.institutionData.countries.includes('Japan');
        hasAustralia = data.institutionData.countries.includes('Australia');
        hasUSA = data.institutionData.countries.includes('USA');
        hasUK = data.institutionData.countries.includes('UK');
    }

    const renderFeatureClasses = () => {
        let array = [];
        if(hasKorea){
            array.push('TOPIK','KLPT')
        }
        if(hasJapan){
            array.push('JLPT,Japanese Proficiency Tests')
        }
        if(hasAustralia || hasUK || hasUSA){
            array.push('IELTS','PTE','TOEFL','Doulingo Tests','GRE','GMAT')
        }
        else{
            array.push('IELTS','PTE','TOEFL','And other preparaotory classes')
        }
        return array
    }

    let featureArray; 
    if(data && data.institutionData.countries.length !== ''){
        featureArray = data && renderFeatureClasses();
    }

    return(
        <div>
            <div>
                <div className='img-back-logo-holder'>
                    { imagesDirectory && <img src={`${imagesDirectory}.jpg`} className="back-logo-img"></img>}
                </div>
                <div className='fields-holder'>
                    <div>
                        countries: {data && data.institutionData.countries.length}
                    </div>
                    <div>
                        universities: {data && data.institutionData.universities !== '' ? data.institutionData.universities : "Not shown" }    
                    </div>
                    <div>
                        experience: {data && data.institutionData.experience !== '' ? data.institutionData.experience : "Now shown"}    
                    </div>
                    <div>
                        success: {data && data.institutionData.success !== '' ? data.institutionData.success : "Not Shown"}    
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>About</div>
                    {renderNegativeReview}
                    {renderPositiveReview}
                </div>
                <div className='feature-holder-in'>
                    <h3>Features</h3>
                    <ul>
                        {
                            data && data.institutionData.countries.length > 0 ? (
                                <li>This institution serves {data.institutionData.countries.length} countries.</li>
                            ) : null}
                        {
                            data && data.institutionData.countries.length > 0 ? (
                            <li>It serves countries like {data.institutionData.countries.join(', ')} etc.</li>
                            ) : null}
                        {
                            data && data.institutionData.experience !== '' ? (
                                <li>This institution has the experience of {data.institutionData.experience} years</li>
                            ) : null
                        } 
                        {
                            data && data.institutionData.success !== '' ? (
                                <li>Till now it has accumulated {data.institutionData.success} successful services</li>
                            ) : null
                        } 
                        {
                            featureArray && 
                            <li>It provides different classes like {featureArray.join(', ')} etc.</li>
                        }

                    </ul>
                </div>
            </div>
            {
                data && 
                <GoogleMap 
                    lat={data.institutionData.latitude}
                    long = {data.institutionData.longitude}
                />
            }
            <div className='post-review'>
                <form onSubmit={handleOnSubmit}>
                    <div className='review'>
                        <label>Review</label>
                        <input
                            name='review'
                            value={reviewData.review}
                            type='text'
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='rating'>
                        <Rating
                            precision={0.5}
                            name='rating'
                            value={reviewData.rating}
                            onChange={ratingHandleChange}
                        />
                    </div>
                    <button>Submit Review</button>
                </form> 
            </div>
        </div>
    )
}