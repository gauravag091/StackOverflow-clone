import React,{useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/blacklogo.png'
import search from '../../assets/magnifying-glass-solid (1).svg'
import Avatar from '../../components/Avatar/Avatar'
import {useSelector,useDispatch} from 'react-redux'
import {setCurrentUser} from '../../actions/currentUser'
import decode from 'jwt-decode'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './Navbar.css';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'
import { fetchAllQuestions } from '../../actions/question'
import { fetchAllUsers } from '../../actions/users'
const Navbar =  () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  var user = useSelector((state)=> (state.currentUserReducer))


  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  useEffect(()=>{
    const token = user?.token;
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  },[dispatch])

const handleLanguage = (e) =>{
 const target_lang = e.target.value;
 if(target_lang !== 'default')
 {
  localStorage.setItem('i18nextLng',target_lang);
  const source_lang = i18n.language;
dispatch(fetchAllQuestions(source_lang,target_lang));
dispatch(fetchAllUsers(source_lang,target_lang))
 i18n.changeLanguage(target_lang);
 }
 

}

  return (
    <nav className="navbar position-sticky main-nav navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <Link to='/' className="navbar-brand">
      <img src={logo} alt="" className="d-inline-block align-text-top navbar-logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to='/' className='nav-i nav-btn'>{t('About',{ns:'Navbar'})}</Link>
        </li>
        <li className="nav-item">
        <Link to='/' className='nav-i nav-btn'>{t('Products',{ns:'Navbar'})}</Link>
        </li>
        <li className="nav-item">
        <Link to='/' className='nav-i nav-btn'>{t('For Teams',{ns:'Navbar'})}</Link>
        </li>
        
      </ul>
      <form className="d-flex">
      <input type="text" name="search" id="search" placeholder={t('search...',{ns:'Navbar'})} className='nav-item' />
      <img src={search} width='18' alt="" className='search-icon' />
      </form>


      <select className="form-select w-auto " defaultValue={localStorage.getItem('i18nextLng')} style={{appearance:'none'}} aria-label="Default select example" onChange={handleLanguage}>
  <option value='default'>{t('lang')}</option>
  <option value="en">{t('en')}</option>
  <option value="hi">{t('hi')}</option>
  <option value="pa">{t('pa')}</option>
  <option value="fr">{t('fr')}</option>
  <option value="bn">{t('bn')}</option>
</select>


      <div className='d-flex '>
      {
          user === null?
            <Link to='/Auth' className='nav-i nav-links'>{t('Log in',{ns:'Navbar'})}</Link> :
            <>
              <Avatar backgroundColor='#009dff' px='10px' py='5px' borderRadius='50%' color='white'><Link to = {`/Users/${user?.result?._id}`} className='' style={{textDecoration:'none',color:'white'}}>{user?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>
              <button className='nav-i nav-links' onClick={handleLogout}>{t('Log out',{ns:'Navbar'})}</button>
            </>
        }
      </div>
      
    </div>
   
  </div>  
</nav>
  )
}

export default Navbar
