import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import '../../App.css'

const Questions = () => {
  return (
    <div className=''>
      <LeftSidebar />
      <div className="row">
        <div className="col-xl-8  d-flex  justify-content-center" style={{marginLeft:'auto',marginRight:'auto'}}>
        <HomeMainbar></HomeMainbar>
        </div>
        <div className="col-4 d-flex justify-content-center"><RightSidebar></RightSidebar></div>
      </div>

    </div>
  )
}

export default Questions