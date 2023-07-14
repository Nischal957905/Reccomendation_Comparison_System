import { Route , Routes, BrowserRouter} from "react-router-dom";
import PublicLayout from './layouts/PublicLayout'
import PrivateLaout from './layouts/PrivateLayout'

import Home from './views/Home'
import InstitutionList from "./views/institution/InstitutionList";

export default function App(){

  return (
    <Routes>
      <Route path="/" element= {<PublicLayout/>}>
        <Route index element= { <Home/>}/>
        
        <Route path="/institution" element= { <InstitutionList/>} />
      </Route>
    </Routes>
  )
}
