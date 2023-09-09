import React from 'react'
import {useTranslation} from 'react-i18next'

const WidgetTags = () => {
  const {t} = useTranslation();
    const tags = t('widgetTags').split(",");
  return (
    <div className='widget-tags'>
      <h3>{t('widget1')}</h3>
      <div className="widget-tags-div">
        {
            tags.map((tag)=>(
                <p key={tag}>{tag}</p>
            ))
        }
      </div>
    </div>
  )
}

export default WidgetTags
