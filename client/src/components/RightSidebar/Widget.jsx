import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blackLogo from '../../assets/blacklogo-1.svg'
import {useTranslation} from 'react-i18next';
const Widget = () => {
  const {t} = useTranslation();
  const [The,Observability,Podcast,Featured,Review,Please,Outdated] = t('widget').split('+');
  return (
    <div className='widget'>
      <h4>{The}</h4>
      <div className='right-sidebar-div-1'>
      <div className="right-sidebar-div-2">
        <img src={pen} alt="pen" width={18} />
        <p>{Observability}</p>
      </div>
      <div className="right-sidebar-div-2">
        <img src={pen} alt="pen" width={18} />
        <p>{Podcast}</p>
      </div>   
      </div>
      
      <h4>{Featured}</h4>
      <div className='right-sidebar-div-1'>
      <div className="right-sidebar-div-2">
        <img src={comment} alt="comment" width={18} />
        <p>{Review}</p>
      </div>
      <div className="right-sidebar-div-2">
        <img src={comment} alt="comment" width={18} />
        <p>{Please}</p>
      </div>  
      <div className="right-sidebar-div-2">
        <img src={blackLogo} alt="logo" width={18} />
        <p>{Outdated}</p>
      </div> 
      </div>

      <h4>{t('hot_meta_post')}</h4>
      <div className='right-sidebar-div-1'>
      <div className="right-sidebar-div-2">
        <p>38</p>
        <p>{t('meta_post_desc1')}</p>
      </div>
      <div className="right-sidebar-div-2">
        <p>20</p>
        <p>{t('meta_post_desc2')}...</p>
      </div> 
      <div className="right-sidebar-div-2">
        <p>14</p>
        <p>{t('meta_post_desc3')}</p>
      </div>   
      </div>
    </div>
  )
}

export default Widget
