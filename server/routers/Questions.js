import express from 'express'
import {AskQuestion, getAllquestions, deleteQuestion, voteQuestion} from '../controllers/Questions.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.post('/ask',auth, AskQuestion);
router.get('/get', getAllquestions);
router.delete('/delete/:id',auth, deleteQuestion);
router.patch('/vote/:id',auth, voteQuestion);

export default router