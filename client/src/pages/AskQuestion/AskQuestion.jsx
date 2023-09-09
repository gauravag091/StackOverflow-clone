import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import  {askQuestion} from '../../actions/question'
import './AskQuestion.css'
import {useTranslation} from 'react-i18next'
const AskQuestion = () => {
  const {t} = useTranslation();
  const ask_question_data = t('ask_question').split('+');
  // console.log(ask_question_data);
  const [ask,title,placeholder,beSpecific,body,Include,tags,addup,Review] = ask_question_data;
  const[questionTitle, setQuestionTitle] = useState('')
  const[questionBody, setQuestionBody] = useState('')
  const[questionTags, setQuestionTags] = useState('')

  const dispatch = useDispatch()
  const User = useSelector((state)=>(state.currentUserReducer))
  const navigate = useNavigate();
  
  const last_date = new Date(String(User?.result?.last_asked_on));

  const handleEnter = (e) =>{
    if(e.key==='Enter'){
      setQuestionBody(questionBody+"\n")
    }
  }

  const handleSubmit = (e) =>{
    const last_date = new Date(String(User?.result?.last_asked_on)).getTime();
    e.preventDefault()
    if(User.result.subscription_type === 'free' && (Date.now()-last_date)/(1000*60*60*24)<1 )
    {
      alert(t('subscribe_policy').split('+')[0]);
    }
    else if(User.result.subscription_type === 'silver')
    {
      if((Date.now()-last_date)/(1000*60*60*24)<1 && (User.result.questions_asked % 5)===0 )
      {
        alert(t('subscribe_policy').split('+')[1])
      }
      else
      {
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted:User.result.name,userId:User.result._id},navigate))
      }
    }
    else
    {
      dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted:User.result.name,userId:User.result._id},navigate))
    }
    

  }
    
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>{ask}</h1>



<form onSubmit={handleSubmit} >
<div className="ask-form-container">
  <div className="form-group">
    <label htmlFor="ask-ques-tags"><h4>{title}</h4></label>
    <input type="text" className="form-control" onChange={(e) => {setQuestionTitle(e.target.value)}} name='questionTitle' id="ask-ques-tags" aria-describedby="titleHelp" placeholder={placeholder}/>
    <small id="titleHelp" className="form-text text-muted">{beSpecific}</small>
  </div>

  <div className="form-group">
    <label htmlFor="ask-ques-body"><h4>{body}</h4></label>
    
    <textarea className="form-control" id="ask-ques-body" rows="5" onChange={(e) => {setQuestionBody(e.target.value)}} onKeyPress={handleEnter}
                name="" aria-describedby='bodyHelp'></textarea>
                <small id="bodyHelp" className="form-text text-muted">{Include}</small>
  </div>

  <div className="form-group">
    <label htmlFor="ask-ques-tags"><h4>{tags}</h4></label>
    <input type="text" className="form-control" onChange={(e) => {setQuestionTags(e.target.value.split(" "))}} name='questionTags' id="ask-ques-tags" aria-describedby="tagsHelp" />
    <small id="tagsHelp" className="form-text text-muted">{addup}</small>
  </div>

  <button type="submit" className="btn btn-primary mt-2">{Review}</button>
  </div>
</form>


      </div>
    </div>
  )
}

export default AskQuestion
