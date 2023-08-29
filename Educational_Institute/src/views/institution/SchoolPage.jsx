import  { useParams } from 'react-router-dom'
import { useGetSingleSchoolQuery,  usePostReviewQuery } from "../../app/api/appSlice"
import GoogleMap from '../../components/utilities/GoogleMap';
import { useState, useEffect } from 'react';
import Rating from "@mui/material/Rating";

export default function SchoolPage() {

    const { school } = useParams();
    const institution = school;
    const username = localStorage.getItem('username')
    const [delayedData, setDelayedData] = useState({})
    
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetSingleSchoolQuery(school);

    const [reviewData, setReviewData] = useState({
        'username' : username,
        'rating': 0,
        'review': '',
        'institution': null
    })

    const {
        data: dataReview,
        isLoading: loaded,
        isSuccess: success,
        isError: errors,
    } = usePostReviewQuery({institution, delayedData})
    
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

    useEffect(() => {
        if(success){
            refetch()
        }
    },[dataReview])

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if(reviewData.review && reviewData.review !== ''){
            setDelayedData(reviewData)
        }
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

    if(data){
        imagesDirectory = `/images/VITO_Education`;
    }

    return(
        <div>
            <div>
                <div className='img-back-logo-holder'>
                    { imagesDirectory && <img src={`${imagesDirectory}.jpg`} className="back-logo-img"></img>}
                </div>
                <div className='fields-holder'>
                    <div>
                        accrecreditation: {data && data?.institutionData.accreditation}
                    </div>
                    <div>
                        established at: {data && data?.institutionData.established !== '' ? data?.institutionData.established : "Not shown" }    
                    </div>
                    <div>
                        experience: {data && data?.institutionData.experience !== '' ? data?.institutionData.experience : "Now shown"}    
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>About</div>
                    
                </div>
                <div className='feature-holder-in'>
                    <h3>Features</h3>
                    <ul>
                        {
                            data && data?.institutionData.ownership && data?.institutionData.ownership === 'private Institution' ? (
                                <li>This institution is a privately owned institution</li>
                            ) : <li>This institution is a ppublicly owned institution</li>}
                        {
                            data && data?.institutionData.established && data?.institutionData.established !== '' ? (
                            <li>It was established at {data?.institutionData.established}</li>
                            ) : null}
                        {
                            data && data?.institutionData.experience !== '' ? (
                                <li>This college has the experience of {data?.institutionData.experience} years</li>
                            ) : null
                        } 
                    
                    </ul>
                </div>
            </div>
            {
                data && data?.institutionData.latitude && data?.institutionData.latitude !== '' &&
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
            <div>
                {
                    data && data?.positiveReview.length > 0 && <h1>Postive Reviews</h1> }
                {
                    data && data?.positiveReview.length > 0 &&
                    data.positiveReview.map((item,index) => {
                        return(
                            <div key={index}>
                                <p>{item.review}</p>
                                <p>By {item.username}</p>
                                <p>{item.rating} star</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    data && data?.negativeReview.length > 0 && <h1>Negative Reviews</h1> }
                {
                    data && data?.negativeReview.length > 0 &&
                    data.negativeReview.map((item,index) => {
                        return(
                            <div key={index}>
                                <p>{item.review}</p>
                                <p>By {item.username}</p>
                                <p>{item.rating} star</p>
                            </div>
                        )
                    })
                }
            </div>                        
        </div>
    )
}