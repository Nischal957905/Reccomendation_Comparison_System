//Necessary Imports for the page. This is the main page that manages overall system.
import { Route , Routes, BrowserRouter} from "react-router-dom";
import PublicLayout from './layouts/PublicLayout'
import PrivateLaout from './layouts/PrivateLayout'

import Home from './views/Home'
import InstitutionList from "./views/institution/InstitutionList";

//main function for the page defined to be exported.
export default function App(){

  //this is the return statement that has bunch of routes defined and acts as the routing page for the app.
  return (
    <Routes>
      <Route path="/" element= {<PublicLayout/>}>
        <Route index element= { <Home/>}/>
        
        <Route path="/institution" element= { <InstitutionList/>} />
      </Route>
    </Routes>
  )
}
