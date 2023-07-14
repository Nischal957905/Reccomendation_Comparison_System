import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

export default function PublicLayout(){

    return (
        <>
            <PublicHeader/>
            <div className="body-part">
                <Outlet/>
            </div> 
        </>
    )
}