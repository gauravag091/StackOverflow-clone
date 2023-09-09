import mongoose from 'mongoose'
import Questions from '../models/Questions.js'
import User from '../models/auth.js'

export const postAnswer = async(req,res)=>{
    const {id:_id} = req.params
    const {noOfAnswers, answerBody, userAnswered, userId} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('question is not valid')
    }
    updateNoOfQuestions(_id,noOfAnswers)
 
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{answer:[{answerBody, userAnswered, userId}]}},{new:true});
        const user = await User.findById(userId);
        let ansCount = 0;
        for(let i = 0;i<updatedQuestion.answer.length;i++)
        {
          if(updatedQuestion.answer[i].userId === userId){
            ansCount+=1;
          } 
        }
        if(ansCount === 1 && userId !== updatedQuestion.userId)
        {
          user.answered += 1;
          user.points += 1;
        }
          
        if(user.answered<=20)
        { 
          if(user.answered >= 5 && user.answered < 10)
        {
          const checkbadge = user.badge.find((badge)=> badge === 'Honor')
            if(checkbadge === undefined)
               user.badge.push('Honor');
        }
        else if(user.answered >=10 && user.answered < 15)
        {
          const checkbadge = user.badge.find((badge)=> badge === 'Bronze')
            if(checkbadge === undefined)
               user.badge.push('Bronze');
        }
        else if(user.answered >= 15 && user.answered < 20)
         {
          const checkbadge = user.badge.find((badge)=> badge === 'Silver')
            if(checkbadge === undefined)
               user.badge.push('Silver');
         }
        else if(user.answered>=20)
        {
          const checkbadge = user.badge.find((badge)=> badge === 'Gold')
            if(checkbadge === undefined)
               user.badge.push('Gold');
        }
        }
        
         await User.findByIdAndUpdate(userId,user);
        const updatedProfile = await User.findById(userId);

        // let ansIndex = update

        res.status(200).json({updatedQuestion, updatedProfile});

    } catch (error) {
      console.log(error);
        res.status(400).json(error)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) =>{
    try {
        await Questions.findByIdAndUpdate(_id,{$set:{noOfAnswers:noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers, userId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(404).send("Answer unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
      await Questions.updateOne(
        { _id },
        { $pull: { answer: { _id: answerId } } }
      );
      const updatedQuestion = await Questions.findById(_id);
      const user = await User.findById(userId);
      const checkAns = updatedQuestion.answer.filter((answer)=> answer.userId === userId)
      if(checkAns.length === 0)
      {
        user.answered -= 1;
        user.points -= 1;
      }
        
      await User.findByIdAndUpdate(userId, user);
      res.status(200).json({ message: "Successfully deleted..." });
    } catch (error) {
      console.log(error)
      res.status(405).json(error);
    }
  };