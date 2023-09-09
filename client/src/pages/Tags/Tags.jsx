import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList.jsx'
import { useTranslation } from 'react-i18next'
import './Tags.css'
const Tags = () => {
  const {t} = useTranslation();
  const tagsdata = t('widgetTagsList').split('+');
  let tagslist = [];
  for(let i=0;i<tagsdata.length;i++)
  {
    const tag = {tagName:tagsdata[i],tagDesc:tagsdata[++i]};
    tagslist.push(tag);
  }
  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2">
        <h1 className='tags-h1'>{t('Tags')}</h1>
        <p className='tags-p'>{t('TagH1')}</p>
        <p className='tags-p'>{t('TagH2')}</p>
        <div className="tags-list-container">
          {
            tagslist.map((tag, index) => (
            <TagsList tag={tag} key={index} />
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Tags
