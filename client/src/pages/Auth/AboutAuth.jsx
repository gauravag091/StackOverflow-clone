import React from 'react'
import {useTranslation} from 'react-i18next'
const AboutAuth = () => {
  const {t} = useTranslation();
  const data = t('aboutauth').split('+');
  const [Join,Get,Unlock,Save,Earn,Collaborate,GetStack] = data;
  return (
    <div className="auth-container-1">
      <h1>{Join}</h1>
      <p>{Get}</p>
      <p>{Unlock}</p>
      <p>{Save}</p>
      <p>{Earn}</p>
      <p style={{fontSize:'13px',color:'#666767'}}>{Collaborate}</p>
      <p style={{fontSize:'13px',color:'#007ac6'}}>{GetStack}</p>
    </div>
  )
}

export default AboutAuth
