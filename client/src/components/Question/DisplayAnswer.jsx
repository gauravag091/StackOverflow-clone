import React from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import moment from 'moment'
import Avatar from '../Avatar/Avatar'
import {useSelector, useDispatch} from 'react-redux'
import {deleteAnswer} from '../../actions/question'
import {useTranslation} from 'react-i18next'

const DisplayAnswer = ({question,handleShare}) => {
  const {t} = useTranslation();
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const User = useSelector((state)=> state.currentUserReducer)
  const handleDelete = (answerId, noOfAnswers) =>{
    dispatch(deleteAnswer(id,answerId,noOfAnswers-1,navigate,User.result._id))
  }
  return (
    <div>
      {
        question.answer.map((ans)=>(
            <div className='display-ans' key={ans._id}>
                <p>{ans.answerBody}</p>
                <div className="question-actions-user">
                    <div>
                    <button type='button' onClick={handleShare}>{t('share')}</button>
                    {
                        
                        User?.result?._id === ans?.userId && (
                          <button type="button" onClick={() => handleDelete(ans._id, question.noOfAnswers)}>{t('delete')}</button>
                        )
                      }
                    </div>
                    <div>
                        <p>{t('answered')} {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                          <Avatar backgroundColor='green' px='8px' py='5px'>{ans?.userAnswered?.trim()?.charAt(0).toUpperCase()}</Avatar>
                          <div>
                            {ans.userAnswered}
                          </div>
                        </Link>
                    </div>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default DisplayAnswer
