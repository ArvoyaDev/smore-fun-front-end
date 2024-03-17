import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
     BrowserRouter as Router,
     Routes,
     Route,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Search from "./components/Search"
import Notebook from "./components/Notebook.jsx";
import { withAuth0 } from "@auth0/auth0-react";
import Welcome from "./components/Welcome.jsx";
import Profile from "./components/Profile.jsx";

function App({ auth0 }) {
     const [count, setCount] = useState(0)
     const { isAuthenticated } = auth0;

     return (
          <div className='App'>
               <Router>
                    <Header/>
                    <Routes>
                         <Route
                              exact path='/'
                              element={<Search className='search' />}
                         />
                         <Route
                              exact path='/notebook'
                              element={isAuthenticated ? <Notebook/> : <Welcome/>}
                         />
                         {isAuthenticated &&
                              <Route
                                   exact path ='/profile'
                                   element={<Profile/>}
                              />
                         }
                    </Routes>
               </Router>
          </div>
     )
}

export default withAuth0(App);