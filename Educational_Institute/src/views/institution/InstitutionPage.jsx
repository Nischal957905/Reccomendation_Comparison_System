import  { useNavigate, useParams } from 'react-router-dom'
import { useGetSingleInstitutionQuery, usePostReviewQuery } from "../../app/api/appSlice"
import GoogleMap from '../../components/utilities/GoogleMap';
import { useState, useEffect } from 'react';
import Rating from "@mui/material/Rating";
import useAuthentication from '../../components/hooks/useAuthentication';
import SchoolIcon from '@mui/icons-material/School';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Button, Divider, TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import MessageProp from '../../components/utilities/MessageProp';

export default function InstitutionPage() {

    const { institution } = useParams();
    const { valueForAuth } = useAuthentication()
    const [delayedData, setDelayedData] = useState({})
    
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetSingleInstitutionQuery(institution);

    const [reviewData, setReviewData] = useState({
        'username' : valueForAuth.username,
        'rating': 0,
        'review': '',
        'institution': null
    })

    const navigation = useNavigate()

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

    const {
        data: dataReview,
        isLoading: loaded,
        isSuccess: success,
        isError: errors,
    } = usePostReviewQuery({institution, delayedData})
    //console.log(reveiwData.positiveReview)

    useEffect(() => {
        if(success){
            refetch()
        }
    },[dataReview])

    
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

    const imageUrl = '../images/Australia.jpg';

    const divStyle = {
        backgroundImage: `url(${imageUrl})`,
        width: '100%',
        height: '100%'
    };

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
            <div className='basic-info' style={{
                backgroundImage: `url(${imageUrl})`
            }}>
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
                            <div className='popls'>{data && data.institutionData.countries.length}</div>
                            <div className='popl'>COUNTRY</div>
                        </div>
                        <div>
                            <div className='popls'>{data && data.institutionData.universities !== '' ? data.institutionData.universities : "n.s" }  </div>
                            <div className='popl'>UNIVERISTY</div>
                        </div>
                        <div>
                            <div className='popls'>{data && data.institutionData.experience !== '' ? data.institutionData.experience : "n.s"}    </div>
                            <div className='popl'>EXPERIENCE</div>
                        </div>
                        <div>
                            <div className='popls'>{data && data.institutionData.success !== '' ? data.institutionData.success : "n.s"}   </div>
                            <div className='popl'>SUCCESS</div>
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
                                {data.institutionData.experience || " many "} years. During its service period it 
                                has been continously providing its wide range of services. {data.institutionData.countries.length > 1 
                                ? "It has been providing its unique and needy services for multiple countries accross the world" :
                                "It has been providing its needy services exceling in a particular country. "}{data.institutionData.address &&
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
                    data && data?.institutionData.latitude !== '' && data?.institutionData.latitude &&
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