import React from 'react'
import { useTranslation } from "react-i18next";

const Avatar = ({children,backgroundColor,px,py,color,borderRadius,fontSize,cursor}) => {
  
  const { t } = useTranslation();
  const style = {
    backgroundColor,
    padding:`${py} ${px}`,
    color:color||'black',
    borderRadius,
    fontSize,
    textAlign:'center',
    cursor:cursor||null
  }
  return (
    <div style={style}>
        {children}
    </div>
  )
}

export default Avatar
