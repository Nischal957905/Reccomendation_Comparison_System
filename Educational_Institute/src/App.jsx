//Necessary Imports for the page. This is the main page that manages overall system.
import { Route , Routes, BrowserRouter} from "react-router-dom";
import PublicLayout from './layouts/PublicLayout'
import PrivateLaout from './layouts/PrivateLayout'

import Home from './views/Home'
import InstitutionList from "./views/institution/InstitutionList";
import Comparison from "./views/comparison/Comparison";
import ComparisonCollege from "./views/comparison/ComparisonCollege";
import ComparisonPage from "./views/comparison/ComparisonPage";
import EachComparison from "./views/comparison/EachComparison";
import InstitutionPage from "./views/institution/InstitutionPage"
import CollegeList from "./views/institution/CollegeList";
import CollegePage from './views/institution/CollegePage';
import Login from './views/auth/Login';
import AuthenticationEnable from './components/auth/AuthenticationEnable';
import Post from "./views/discussion/Post";

//main function for the page defined to be exported.
export default function App(){

  //this is the return statement that has bunch of routes defined and acts as the routing page for the app.
  return (
    <Routes>
      <Route path="/" element= {<PublicLayout/>}>
        <Route index element= { <Home/>}/>
        
        <Route path="/auth/login" element= {<Login />}/>
       
        
        <Route path="/comparison" element= { <Comparison/> } />
        <Route path="/comparison/college" element= { <ComparisonCollege/> } />
        <Route path="comparison/:instituions" element= {<EachComparison/>} />
        <Route path="/institution/:institution" element= {<InstitutionPage/>}/>
        <Route path="/college/:college" element= {<CollegePage/>}/>

        <Route element={<AuthenticationEnable/>}>
          <Route path="/college" element= { <CollegeList/>} />
          <Route path="/institution" element= { <InstitutionList/>} />
          <Route path="/discussion" element={<Post/>} />
        </Route>
        
      </Route>
    </Routes>
  )
}
