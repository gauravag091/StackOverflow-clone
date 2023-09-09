import Questions from '../models/Questions.js'
import User from '../models/auth.js'
import mongoose from 'mongoose'

export const AskQuestion = async (req,res) => {
     const postQuestionData = req.body
     const{userId:_id} = req.body;
     console.log(_id);
     const user = await User.findById(_id);
     const updated_user = await User.findByIdAndUpdate(_id,{$set:{last_asked_on:Date.now(),questions_asked:Number(user.questions_asked+1)}},{new:true})
     const postQuestion = new Questions({...postQuestionData})
     try {
        await postQuestion.save()
        res.status(200).json({result:updated_user})
     } catch (error) {
        console.log(error)
        res.status(409).json("couldn't post a new question")        
     }
}

export const getAllquestions = async (req,res) => {
   try {
      const questionList = await Questions.find()
      res.status(200).json(questionList);
   } catch (error) {
      res.status(404).json({message:error.message})
   }
}

export const deleteQuestion = async (req,res)=>{
   const {id:_id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('question is not valid')
    }

   try {
      const question = await Questions.findById(_id);
      const user = await User.findById(question.userId);
      let noOfVotes = question.upVote.length - question.downVote.length;
      noOfVotes = Math.floor(noOfVotes/5)*5;
      console.log(noOfVotes);
      user.points = user.points - (2*noOfVotes);
      console.log(user.points);
      await User.findByIdAndUpdate(question.userId,user);
      await Questions.findByIdAndRemove(_id)
      res.status(200).json({message:"successfully deleted..."})
   } catch (error) {
      res.status(404).json({message:error.message})
   }
}

export const voteQuestion = async (req,res) => {
   const { id: _id} = req.params;
   const {value, userId} = req.body;

   if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('user is not valid')
    }

    try {
      const question = await Questions.findById(_id)
      const upIndex = question.upVote.findIndex((id) => id === String(userId));
      const downIndex = question.downVote.findIndex((id) => id === String(userId));

      if(value === 'upvote')
      {
         if(downIndex !== -1){
            question.downVote = question.downVote.filter((id) => id !== String(userId))
         }
         if(upIndex === -1)
         {
            question.upVote.push(userId);
         }
         else
         {
            question.upVote = question.upVote.filter((id) => id !== String(userId))
         }

      }
      if(value === 'downvote')
      {
         if(upIndex !== -1){
            question.upVote = question.upVote.filter((id) => id !== String(userId))
         }
         if(downIndex === -1)
         {
            question.downVote.push(userId);
         }
         else
         {
            question.downVote = question.downVote.filter((id) => id !== String(userId))
         }

      }
      await Questions.findByIdAndUpdate( _id, question )
      

      if(value === 'upvote' && upIndex === -1)
      {
         const questions = await Questions.find();
         const user = await User.findById(question.userId);
         const questionsUser = questions.filter((ques)=> ques.userId === question.userId);
         let totalVotes = 0;
         questionsUser.map((ques) =>{
            let noOfVotes = ques.upVote.length - ques.downVote.length;
            if(noOfVotes>=5)
            {
               totalVotes= totalVotes +Math.floor(noOfVotes/5)*5;
            }
         })
         user.points = user.answered + 2*totalVotes;
         if(totalVotes>= 10)
          {
            const checkbadge = user.badge.find((badge)=> badge === 'Cool')
            if(checkbadge === undefined)
               user.badge.push('Cool');
          }
       const  updatedProfile =  await User.findByIdAndUpdate(question.userId, user);
       
      res.status(200).json({message:"voted successfully",updatedProfile});
      return;
      }

     res.status(200).json({message:'voted successfully'});
      
    } catch (error) {
      console.log(error);
      res.status(404).json({message:"id not found"})
    }
}