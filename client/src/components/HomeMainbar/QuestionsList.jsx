import React from 'react'
import Questions from '../Question/Questions'

const QuestionsList = ({questionsList}) => {
  return (
    <>
      {
        questionsList.map((question) => (
          <Questions question={question} key={question?._id} />
        ))
      }
    </>
  )
}

export default QuestionsList
