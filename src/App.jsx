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



function Notebook() {
     return null;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header/>
           <Routes>
        <Route
          exact path='/'
          element={<Search/>}
          />
      <Route
        exact path='/notebook'
        element={<Notebook/>}
        />
           </Routes>
      </Router>
    </>
  )
}

export default App
