import React from 'react'
import './LeftSidebar.css'
import {NavLink} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Globe from '../../assets/Globe.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
import {useTranslation} from 'react-i18next'
const LeftSidebar = () => {

  const {t} = useTranslation();
  const [home,PUBLIC,Questions,Tags,Rewards,Users,subscribe] = t('leftsidebar').split('+');

  var user = useSelector((state)=> (state.currentUserReducer))
  const slideLeft = () => {
    const sidebar = document.querySelector('.left-sidebar');
    const style = getComputedStyle(sidebar)
  
    if(style.left === '0px')
    sidebar.style.left = '-164px';
    else if (style.left === '-164px')
      sidebar.style.left = '0px'
  }
  return (
    <div className='left-sidebar'>
      
      <nav className='side-nav'>
        <NavLink to='/' className='side-nav-links' activeClassName= 'active'>
          <p>{home}</p>
        </NavLink>
        <div className="side-nav-div">
          <div><p>{PUBLIC}</p></div>
          <NavLink to='/Questions' className='side-nav-links' activeClassName = 'active'>
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft:'10px'}}>{Questions}</p>
          </NavLink>
          <NavLink to='/Tags' className='side-nav-links' activeClassName = 'active' style={{paddingLeft:'40px'}}>
              <p>{Tags}</p>
          </NavLink>
          {user !== null && (
            [<NavLink to='/Rewards' className='side-nav-links' activeClassName = 'active' style={{paddingLeft:'40px'}}>
            <p>{Rewards}</p>
          </NavLink>,
          <NavLink to='/subscribe' className='side-nav-links' activeClassName = 'active' style={{paddingLeft:'40px'}}>
            <p>{subscribe}</p>
          </NavLink>]
          )}
          
          <NavLink to='/Users' className='side-nav-links' activeClassName = 'active' style={{paddingLeft:'40px'}}>
              <p>{Users}</p>
          </NavLink>
          
        </div>
      </nav>
      <div className="right-icon" onClick={slideLeft}><FontAwesomeIcon icon={faArrowCircleRight} /></div>
    </div>
  )
}

export default LeftSidebar
