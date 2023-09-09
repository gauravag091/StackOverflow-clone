import React from 'react'
import { useLocation} from 'react-router-dom'
import './HomeMainbar.css'
import QuestionsList from './QuestionsList'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useTranslation } from "react-i18next";

const HomeMainbar = () => {
  const {t} = useTranslation();
  const location = useLocation()  
  var user = useSelector((state)=> (state.currentUserReducer))
  const navigate = useNavigate()

  const questionsList = useSelector((state)=> (state.questionReducer));

  // var questionsList = [
  //   {
  //     _id:1,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function",
  //     questionBody:"It meant to be",
  //     questionTags:['java','node js','react js','mongo db'],
  //     userPosted:'mano',
  //     userId:1,
  //     askedOn:'jan 1',
  //     answer:[
  //       {
  //         answerBody:'answer',
  //         userAnswered:'kumar',
  //         answeredOn:'jan 2',
  //         userId:2,
  //       }
  //     ]
  //   },{
  //     _id:2,
  //     upVotes:2,
  //     downVotes:1,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function",
  //     questionBody:"It meant to be",
  //     questionTags:['java','node js','react js','mongo db'],
  //     userPosted:'mano',
  //     userId:1,
  //     askedOn:'jan 1',
  //     answer:[
  //       {
  //         answerBody:'answer',
  //         userAnswered:'kumar',
  //         answeredOn:'jan 2',
  //         userId:2,
  //       }
  //     ]
  //   },{
  //     _id:3,
  //     upVotes:3,
  //     downVotes:2,
  //     noOfAnswers:2,
  //     questionTitle:"What is a function",
  //     questionBody:"It meant to be",
  //     questionTags:['java','node js','react js','mongo db'],
  //     userPosted:'mano',
  //     userId:1,
  //     askedOn:'jan 1',
  //     answer:[
  //       {
  //         answerBody:'answer',
  //         userAnswered:'kumar',
  //         answeredOn:'jan 2',
  //         userId:3,
  //       }
  //     ]
  //   }
  // ]

 
  const checkAuth = ()=>{
    if(user === null)
    {
      alert("login or signup to ask a question")
      navigate('/Auth')
    }
    else
    {
      navigate('/AskQuestion')
    }
  }
  const [top_que,all_que,ask_que,Load,que] = t('homeMainBar').split('+');
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
{
  location.pathname === '/' ? <h1>{top_que}</h1> : <h1>{all_que}</h1>
}
        <button onClick={checkAuth} className='ask-btn'>{ask_que}</button>
      </div>
      <div>
        {
          questionsList.data === null ? <h1>{Load}</h1> : 
          <>
            <p>{questionsList.data?.length} {que}</p>
             <QuestionsList questionsList={questionsList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
