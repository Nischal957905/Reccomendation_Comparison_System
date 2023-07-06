import crossOriginAccess from "./crossOriginAcess.js";

const continuousOperatingReference = {
    origin: (origin, callback) => {
        if(crossOriginAccess.indexOf(origin) !==-1 || !origin) {
            callback(null, true)
        } else{
            callback(new Error('Not Allowed as per CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default continuousOperatingReference