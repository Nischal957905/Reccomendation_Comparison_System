import  { useParams, useNavigate } from 'react-router-dom'
import { useGetSingleSchoolQuery,  usePostReviewQuery } from "../../app/api/appSlice"
import GoogleMap from '../../components/utilities/GoogleMap';
import { useState, useEffect } from 'react';
import Rating from "@mui/material/Rating";
import { Divider,TextField,Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import MessageProp from '../../components/utilities/MessageProp';

export default function SchoolPage() {

    const { school } = useParams();
    const navigation = useNavigate()
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
        if(error){
            navigation('/error')
        }
    },[error])
    
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
            handleMessageType('Successfully Provided your review', 'success')
            showPopMessage()
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
        imagesDirectory = `/images/${data.institutionData.name.replace(/ /g, "_")}`;
    }

    const [messagePop, setMessagePop] = useState(false)
    const [display, setDisplay] = useState({
        message: '',
        severity: '',
    })
    const destroyPopMessage = (event,reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setMessagePop(false)
    }

    const showPopMessage = () => {
        setMessagePop(true)
    }

    const handleMessageType = (value, severity) => {
        setDisplay({
            message: value,
            severity: severity
        })
    }

    return(
        <div>
            <MessageProp 
                stateValue={messagePop}
                destroy={destroyPopMessage}
                messageType={display.severity}
                message={display.message}
            />
            <div className='basic-info'>
                {   data && data.finalRating &&
                    <div className='rating-in'>
                        <div>
                            <Rating
                                precision={0.5}
                                value={data.finalRating}
                                readOnly
                            />
                        </div>
                    </div>
                }
                <div className='designers'>
                    <div className='img-back-logo-holder'>
                        <div>
                        { imagesDirectory && <img src={`${imagesDirectory}.jpg`} className="back-logo-img"></img>}
                        </div>
                    </div>
                    <div className='fields-holder'>
                        <div>
                            <div className='popls'>{data && data?.institutionData.accreditation}</div>
                            <div className='popl'>Accrecreditation</div>
                        </div>
                        <div>
                            <div className='popls'> {data && data?.institutionData.established !== '' ? data?.institutionData.established : "n.s" }    </div>
                            <div className='popl'>Establishment</div>
                        </div>
                        <div>
                            <div className='popls'>{data && data?.institutionData.experience !== '' ? data?.institutionData.experience : "n.s"}+ years   </div>
                            <div className='popl'>Experience</div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='detail-info'>
                <div className='div-ab'>
                    <div className='divv-abb'>About</div>
                    {
                        data && data.institutionData.name &&
                        (
                            <div className='abb-con'>
                                {data.institutionData.name} has been in the service for
                                {` ${data.institutionData.experience}` || " many "} years. During its service period it 
                                has been continously providing its wide range of educational services. 
                                It has been providing its needy services exceling in educational forte in Nepal. {data.institutionData.address &&
                                `It is located at the heart of nepal right at ${data.institutionData.address}. `}
                            </div>
                        )
                    }
                    <Divider/>
                    {
                        data && data.institutionData.phone &&
                        (
                            <div className='phooone'>
                                <div>
                                    <div className='hd'>Phone</div>
                                    <div className='ddd'>{data.institutionData.phone}</div>
                                </div>
                                <div>
                                    <div className='hd'>Opening Time</div>
                                    <div className='ddd'>{data.institutionData.opening_time}</div>
                                </div>
                                <div>
                                    <div className='hd'>Closing Time</div>
                                    <div className='ddd'>{data.institutionData.closing_time}</div>
                                </div>
                            </div>
                        )
                    }
                    <Divider/>
                </div>
                <div className='feature-holder-in'>
                    <h3 className='divv-abb'>Features</h3>
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
                    <Divider />
                </div>
            </div>
            <div className='review-category'>
                <div className='review-positives'>
                    {
                        data && data?.positiveReview.length > 0 && <div className='divv-abb plop'>Postive Reviews</div> }
                    {
                        data && data?.positiveReview.length > 0 &&
                        data.positiveReview.map((item,index) => {
                            return(
                                <div key={index} className='dbs'>
                                    <Divider />
                                    <div className='dsop'>
                                        <Rating
                                            precision={0.5}
                                            value={item.rating}
                                            readOnly
                                            size='small'
                                        />
                                    </div>
                                    <p className='dopp'>{item.review}</p>
                                    <p className='us-dbs'>{item.username}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='review-negatives'>
                    {
                        data && data?.negativeReview.length > 0 && <div className='divv-abb slop'>Negative Reviews</div> }
                    {
                        data && data?.negativeReview.length > 0 &&
                        data.negativeReview.map((item,index) => {
                            return(
                                <div key={index} className='dbs'>
                                    <Divider />
                                    <div className='dsop'>
                                        <Rating
                                            precision={0.5}
                                            value={item.rating}
                                            readOnly
                                            size='small'
                                        />
                                    </div>
                                    <p className='dopp'>{item.review}</p>
                                    <p className='us-dbs'>{item.username}</p>
                                </div>
                            )
                        })
                    }
                </div> 
            </div>
            <div className='review-map'>
                <div className='post-review'>
                    <form onSubmit={handleOnSubmit}>
                        <div className='rating'>
                            <Rating
                                precision={0.5}
                                name='rating'
                                value={reviewData.rating}
                                onChange={ratingHandleChange}
                                sx={{
                                    '& .MuiRating-iconEmpty': {
                                      color: 'white',
                                    }
                                }}
                            />
                        </div>
                        <div className='review'>
                            <TextField
                                name='review'
                                value={reviewData.review}
                                type='text'
                                onChange={handleOnChange}
                                label="Review"
                                color='primary'
                                multiline
                                variant='standard'
                                fullWidth    
                                required                       
                            />
                        </div>
                        <div className='dsabd'>
                            <Button variant='outlined' type='submit'>Submit Review</Button>
                        </div>
                    </form> 
                </div> 
                <div className='map-holder'>            
                {
                    data && data?.institutionData.latitude && data?.institutionData.latitude !== '' &&
                    <div className='mapper'>
                        <GoogleMap 
                            lat={data.institutionData.latitude}
                            long = {data.institutionData.longitude}
                        />
                    </div>
                }  
                </div>
            </div>           
        </div>
    )
}