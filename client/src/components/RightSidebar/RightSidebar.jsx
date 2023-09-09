import React from 'react'
import './RightSidebar.css'
import Widget from './Widget'
import WidgetTags from './WidgetTags'

const RightSidebar = () => {
  return (
   <aside className='right-sidebar w-80 float-right mr-auto ml-auto'>
      <Widget />
      <WidgetTags />
   </aside>
  )
}

export default RightSidebar
