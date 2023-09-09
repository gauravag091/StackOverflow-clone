import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './components/Question/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Rewards from './pages/Rewards/Rewards'
import Subscribe from './pages/Subscribe/Subscribe'
const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element = {<Questions></Questions>}/>
        <Route path='/AskQuestion' element = {<AskQuestion></AskQuestion>} />
        <Route path='/Questions/:id' element = {<DisplayQuestion></DisplayQuestion>} />
        <Route path='/Tags' element = {<Tags></Tags>} />
        <Route path='/Users' element = {<Users></Users>} />
        <Route path='/Users/:id' element = {<UserProfile></UserProfile>} />
        <Route path='/Rewards' element = {<Rewards></Rewards>} />
        <Route path='/subscribe' element = {<Subscribe/>} />

    </Routes>
  )
}

export default AllRoutes
