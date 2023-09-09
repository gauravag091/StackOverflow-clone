import * as api from '../api'
import {setCurrentUser} from './currentUser'
import { fetchAllUsers } from "./users";

export const signup = (authData,navigate) => async (dispatch)=>{
    try {
        const {data} = await api.signUp(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.stringify(localStorage.getItem('Profile'))))
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
        navigate('/')
    window.location.reload(false)
    } catch (error) {
        console.log(error)
    }
}

export const login = (authData,navigate) => async (dispatch)=>{
    try {
        const {data} = await api.logIn(authData)
        // console.log(data);
        dispatch({type:'AUTH',data});
        dispatch(setCurrentUser(JSON.stringify(localStorage.getItem('Profile'))));
    dispatch(fetchAllUsers('en',localStorage.getItem('i18nextLng')));
        navigate('/')
        window.location.reload(false)
    } catch (error) {
        console.log(error)
    }
}