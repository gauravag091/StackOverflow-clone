import React,{useState} from 'react'
import { useParams,Link,  useNavigate, useLocation } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'
import copy from 'copy-to-clipboard'

import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import {useTranslation} from 'react-i18next'


const QuestionDetail = () => {
  const {t} = useTranslation()
  const answer_post_data = t('answer_post_data').split('+');
  const[asked,answers,your_ans,browse,ask_own] = answer_post_data;
  const {id} = useParams();
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const questionsList = useSelector((state)=> (state.questionReducer))

  const [Answer,setAnswer] = useState('')
  let [upColor,setUpColor] = useState('black');
  let [downColor,setDownColor] = useState('black');

  const User = useSelector((state)=> state.currentUserReducer)
  const location = useLocation()
  const url = 'https://stack-overflow-clone-r4e9-gauravag091.vercel.app/'

  const handlePosAns = (e,answerLength) =>{
   e.preventDefault();
    if(User === null)
    {
      alert('Login or Signup to answer a question')
      Navigate('/Auth')
    }
    else
    {
      if(Answer.trim() !== '')
      {
        dispatch(postAnswer({id,noOfAnswers:answerLength+1, answerBody:Answer,userAnswered:User.result.name, userId:User.result._id}));
        setAnswer(" ");
      }
      else
      {
        alert('please enter a answer')
      }
    }
  }

  const handleShare = () =>
  {
    copy(url + location.pathname)
    alert('Copied url: '+ url + location.pathname)
  }

  const handleDelete = () =>
  {
    dispatch(deleteQuestion(id, Navigate))
  }

  const handleUpVote = () =>
  {
    if(User === null)
      alert("login or signup first")
    else
      dispatch(voteQuestion(id,'upvote', User?.result?._id))
  }
  const handleDownVote = () =>
  {
    if(User === null)
      alert("login or signup first")
    else
      dispatch(voteQuestion(id,'downvote', User?.result?._id))
  }

  return (
    <div className='question-details-page'>
      {
        questionsList?.data === null ? <h1>Loading...</h1>:
        <>
          {
            questionsList?.data?.filter(question => question?._id === (id)).map(question => (
              
              <div key={question._id}>
              <div className='d-none'>
                {[
                  question.upVote.filter((userId)=> userId === User?.result?._id).length>0 && (upColor = 'skyblue'),
                  question.downVote.filter((userId)=> userId === User?.result?._id ).length>0 && (downColor = 'skyblue')
                ]}
              </div>
              <section className="question-details-container">
                <h1>{question.questionTitle}</h1>
                <div className='question-details-container-2'>
                  <div className="question-votes">
                  <FontAwesomeIcon icon = {faCaretUp} size = '2x' style={{color:upColor}} onClick={handleUpVote} />
                    
                    <p>{(question.upVote.length - question.downVote.length)}</p>
                    <FontAwesomeIcon icon = {faCaretDown} size = '2x' style={{color:downColor}} onClick={handleDownVote} />
                  </div>
                  <div style={{width:'100%'}}>
                    <p className='question-body'>{question.questionBody}</p>
                    <div className="question-details-tags">
                      {
                        question.questionTags.map((tag) => (
                          tag.length >0 && <p key={tag}>{tag}</p>
                        ))
                        
                      }
                    </div>
                    <div className="question-actions-user">
                      <div>
                      <button type="button" onClick={handleShare}>{t('share')}</button>
                      {
                        
                        User?.result?._id === question?.userId && (
                          <button type="button" onClick={handleDelete}>{t('delete')}</button>
                        )
                      }
                      
                      </div>
                      <div>
                        <p>{asked} {moment(question.askedOn).fromNow()}</p>

                        <Link to={`/Users/${question?.userId}`} className='user-link' style={{color:'#0086d8'}}>
                          <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                          <div>
                            {question.userPosted}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {
                question.noOfAnswers !==0 && (
                  <section>
                    <h3>{question.noOfAnswers} {answers}</h3>
                    <DisplayAnswer key={question._id} question = {question} handleShare = {handleShare}></DisplayAnswer>
                  </section>
                )
              }
              <section className="post-ans-container">
                <h3>{your_ans}</h3>
                <form onSubmit={(e)=>{handlePosAns(e,question.answer.length)}}>
                <textarea name="" id="" cols="30" rows="10"  onChange={(e) => setAnswer(e.target.value)} value = {Answer}></textarea> <br />
                <input type="submit" className='post-ans-btn' value={your_ans} />
                </form>
                <p>
                  {browse}
                  {
                    question.questionTags.map((tag)=>(
                    tag.length>0 &&  <Link to='/tags' key={tag} className='ans-tags'> {tag} </Link>
                    ))
                  } or 
                  <Link to='/AskQuestion' style={{textDecoration:'none',color:'#009dff'}}> {ask_own}</Link>
                </p>
              </section>
              </div>
            ))
          }
        </>
      }
    </div>
  )
}

export default QuestionDetail
