import {BrowserRouter as Router} from 'react-router-dom';
import React,{ useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import AllRoutes from './AllRoutes';
import decode from 'jwt-decode'
import { fetchAllQuestions } from './actions/question';
import {setCurrentUser} from './actions/currentUser'
import { fetchAllUsers } from './actions/users';
import i18n from './i18n';


function App() {



  const dispatch = useDispatch()
  let target_lang = localStorage.getItem('i18nextLng');
  if(target_lang!==null)
  {
    i18n.changeLanguage(target_lang);
    dispatch(fetchAllQuestions('en',target_lang));
    dispatch(fetchAllUsers('en',target_lang));
  }
  // const navigate = useNavigate();
  var user = useSelector((state)=> (state.currentUserReducer))
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    // navigate('/')
    dispatch(setCurrentUser(null))
  }
  const token = user?.token;
  if(token){
    const decodedToken = decode(token)
    if(decodedToken.exp * 1000 < new Date().getTime()){
      handleLogout()
    }
  }
useEffect(()=>{
  
dispatch(fetchAllQuestions())
dispatch(fetchAllUsers())
},[dispatch])
  return (
    <div className="App" lang='hi'>
    <Router>
      <Navbar />
      <AllRoutes/>
    </Router>
    </div>
  );
}

export default App;
