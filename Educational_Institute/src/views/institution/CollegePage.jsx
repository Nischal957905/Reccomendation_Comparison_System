import  { useParams } from 'react-router-dom'
import { useGetSingleCollegeQuery } from "../../app/api/appSlice"
import GoogleMap from '../../components/utilities/GoogleMap';

export default function InstitutionPage() {

    const { college } = useParams();
    
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSingleCollegeQuery(college);

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
                        accrecreditation: {data && data.accreditation}
                    </div>
                    <div>
                        established at: {data && data.established !== '' ? data.established : "Not shown" }    
                    </div>
                    <div>
                        experience: {data && data.experience !== '' ? data.experience : "Now shown"}    
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
                            data && data.ownership && data.ownership === 'private Institution' ? (
                                <li>This institution is a privately owned institution</li>
                            ) : <li>This institution is a ppublicly owned institution</li>}
                        {
                            data && data.established && data.established !== '' ? (
                            <li>It was established at {data.established}</li>
                            ) : null}
                        {
                            data && data.experience !== '' ? (
                                <li>This college has the experience of {data.experience} years</li>
                            ) : null
                        } 
                    
                    </ul>
                </div>
            </div>
            {
                data && 
                <GoogleMap 
                    lat={data.latitude}
                    long = {data.longitude}
                />
            }                
        </div>
    )
}