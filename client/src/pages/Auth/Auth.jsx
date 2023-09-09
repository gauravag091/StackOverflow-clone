import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './Auth.css'
import icon from '../../assets/favicon.co.png'
import AboutAuth from './AboutAuth'
import {signup, login} from '../../actions/auth'
import {useTranslation} from 'react-i18next'
const Auth = () => {
  const {t} = useTranslation();
  const authdata = t('auth').split(' + ');
  const authdata1 = t('auth1').split(' + ');
  const[Display,Email,Password,forgot,must,characters,number,optin,product,company,By,terms] = authdata;
  const [service,privacy,AND,cookie,already,donot,log,sign] = authdata1;
  const handleSwitch = () =>{
    setIsSignup(!isSignup)
  }
  const [isSignup,setIsSignup] = useState(false);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(email === '' || password === '')
    {
      alert("enter email and password")
    }
    else if(isSignup)
    {
      if(!name)
        alert("please enter a name")
        dispatch(signup({name,email,password},navigate))
    }
    else
    {
      dispatch(login({email, password},navigate))
    }
  }

  return (
    <section className="auth-section row">
    {isSignup && 
    <div className="col-xl-8  d-none d-xl-flex justify-content-center "><AboutAuth/></div>
    
    }
        <div className="auth-container-2 col-xl-4  d-flex justify-content-center">
          {!isSignup && <img src={icon} alt = 'stck overflow' width='60' className='login-logo'/>}
          
          <form onSubmit={handleSubmit} className='w-lg-100'>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>{Display}</h4>
                <input type="text" name='name' id='name' onChange={(e)=>{setName(e.target.value)}} />
              </label>
            )
          }
            <label htmlFor="email">
              <h4>{Email}</h4>
              <input type="email" name='email' id='email' onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label htmlFor="password">
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h4 >{Password}</h4>
              { !isSignup && <p style={{color:'#007ac6',fontSize:'13px',position:'relative',left:'-28px'}}>{forgot}</p> }
            </div>
              
              <input type="password" name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}} />
              {isSignup && <p style={{color:'#666767',fontSize:'13px'}}>{must}<br/>
{characters}<br/>{number}</p>}
            </label>
            {
              isSignup && (
                <label htmlFor="check">
                  <input type="checkbox" id = 'check' />
                  <p style={{fontSize:'13px'}}>{optin}<br />
{product}<br />{company}</p>
                </label>
              )
            }
            <button type='submit' className='auth-btn'>{isSignup ? sign:log}</button>
          </form>
          {
            isSignup && (
              <p style={{color:'#666767',fontSize:'13px'}}>{By} 
              <span style={{color:'#007ac6'}}> {terms} <br /> {service}</span>, 
              <span style={{color:'#007ac6'}}> {privacy}</span> {AND} 
              <span style={{color:'#007ac6'}}> {cookie}</span></p>
            )
          }
          <p>
            {isSignup ? already:donot}
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup? log:sign}</button>
          </p>
        </div>
    </section>
  )
}

export default Auth
