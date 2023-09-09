import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const Questions = ({question}) => {
  const {t} = useTranslation();
  const [vote,ans,asked] = t('QuestionDetail').split('+');
  if(question == null)
  {
    return (
      <div>
      
      </div>
    )
  }
  
  return (


    <div className='display-question-container'>
    
      <div className="display-votes-ans">
            <p>{question?.upVote?.length - question?.downVote?.length}</p>
            <p>{vote}</p>
      </div>
      <div className="display-votes-ans">
            <p>{question?.noOfAnswers}</p>
            <p>{ans}</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Questions/${question?._id}`}  className='question-title-link'>{question?.questionTitle}</Link>
        <div className="display-tags-time">
            <div className="display-tags">
                {
                    question?.questionTags?.map((tag) => (
                       tag.length>0 && <p key={tag}>{tag}</p>
                    ))
                }
            </div>
            <p className="display-time">
                {asked} {moment(question?.askedOn).fromNow()} {question?.userPosted}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
