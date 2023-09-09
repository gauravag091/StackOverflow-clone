import React from 'react'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import QuestionDetail from './QuestionDetail'

const DisplayQuestion = () => {
  return (
    <div className=''>
      <LeftSidebar />
      <div className="row">
        <div className="col-xl-8  d-flex  justify-content-center" style={{marginLeft:'auto',marginRight:'auto'}}>
        <QuestionDetail />
        </div>
        <div className="col-4 d-flex justify-content-center"><RightSidebar></RightSidebar></div>
      </div>

    </div>
  )
}

export default DisplayQuestion
