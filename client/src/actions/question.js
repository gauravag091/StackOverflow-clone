import * as api from '../api'
import { fetchAllUsers } from './users';
import { translateapi } from './translate';
import { setCurrentUser } from './currentUser';

export const askQuestion = (questionData, navigate) => async (dispatch)=> {
  try {
    const {data} = await api.postQuestion(questionData)
    // dispatch({type:"POST_QUESTION",payload:data})
    // console.log(data);
    
    const user = JSON.parse(localStorage.getItem('Profile'));
        // console.log(user);
        // dispatch({type:'AUTH',data});
       const new_user = {result:data.result,token:user['token']}
       dispatch({type:'AUTH',data:new_user});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
    dispatch(fetchAllQuestions('en',localStorage.getItem('i18nextLng')))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllQuestions = (source_lang,target_lang) => async (dispatch) => {
    console.log("fetched data from server");
  try {
    const {data} = await api.getAllQuestions()
    if(source_lang !== undefined && target_lang !== undefined && target_lang!=='en')
    {
      const updated_data =  await Promise.all(
        data.map(async(question) => {
          let text = question.questionTitle + "+" + question.questionBody + "+"  + question.userPosted + "+" + question.questionTags.join('+') ;
          text = text.replaceAll('&','%26');
          text = text.replaceAll('+','%2B');
          text = text.replaceAll('=','%3D')
        const test = await translateapi(text,'en',target_lang);

         const translated_data = test['translated Text'];
         if(translated_data!==undefined)
         {
         const [que_title,que_body,user_posted,...ques_tags] = translated_data?.split("+");
         
        const answers = await Promise.all(
          question.answer.map(async(answer) => {
              let ans_text = answer.answerBody + " + " + answer.userAnswered;
              ans_text = ans_text.replaceAll('&','%26');
              ans_text = ans_text.replaceAll('+','%2B');
              ans_text = ans_text.replaceAll('=','%3D');

              const ans_test = await translateapi(ans_text,'en',target_lang);
              const translated_ans = ans_test['translated Text'];
              const [ans_body,ans_userAnswered] = translated_ans?.split("+");
              const new_ans = {...answer,answerBody:ans_body,userAnswered:ans_userAnswered};
              return new_ans;
          })
        )
  
        const new_que = {...question,questionTitle:que_title,questionBody:que_body,questionTags:ques_tags,userPosted:user_posted,answer:answers};
         
        
        return new_que;
         }
      })
    )
    if(updated_data!==undefined && updated_data[0]!==undefined){
    dispatch({type:"FETCH_ALL_QUESTIONS",payload:updated_data})
    return;
    }
    }
    dispatch({type:"FETCH_ALL_QUESTIONS",payload:data})
   
 
    
    
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async(dispatch) =>{
  try {
    await api.deleteQuestion(id)
    dispatch(fetchAllQuestions('en',localStorage.getItem('i18nextLng')))
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const postAnswer = (answerdata) => async (dispatch) =>{
  try {
   const {id, noOfAnswers, answerBody, userAnswered, userId} = answerdata
   const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId);
   dispatch({type:"POST_ANSWER",payload:data})
   dispatch({type:'UPDATE_CURRENT_USER', payload: data})
   dispatch(fetchAllQuestions('en',localStorage.getItem('i18nextLng')));
   dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
  //  dispatch()
  } catch (error) {
   console.log(error)
  }
 }

 export const deleteAnswer = (id, answerId, noOfAnswers, navigate,userId) => async (dispatch) =>{
  try {
    await api.deleteAnswer(id, answerId, noOfAnswers, userId);
    dispatch(fetchAllQuestions('en',localStorage.getItem('i18nextLng')));
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
  } catch (error) {
    console.log(error)
  }
 }

 export const voteQuestion = (id, value, userId) => async (dispatch) =>{
  try {
    const {data} = await api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions('en',localStorage.getItem('i18nextLng')));
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
  } catch (error) {
    console.log(error)
  }
 }
