import * as api from '../api'
import { translateapi } from './translate';
import { setCurrentUser } from './currentUser';
export const fetchAllUsers = (source_lang,target_lang) => async (dispatch) =>{
    try {
        const {data} = await api.fetchAllUsers()
        let text = '';
        await data.map(async(user)=>{
            text += user.name + '+';
            if(user.about!==undefined)
                text+=   user.about + '+';
            if(user.badge.length>0)
             text+=  user.badge.join('+') + '+';
            if(user.tags.length>0)
                text+=  user.tags.join('+') + '+'
            return user;
        })
        text = text.replaceAll('&','%26');
          text = text.replaceAll('+','%2B');
          text = text.replaceAll('=','%3D')
        if(target_lang!==undefined && source_lang!==undefined)
        {
            const  change_data = await Promise.all(
                data.map(async(user) => {
                    let text = '';
                    text += user.name + '+';
            if(user.about!==undefined)
                text+=   user.about + '+';
            if(user.badge.length>0)
             text+=  user.badge.join('+') + '+';
            if(user.tags.length>0)
                text+=  user.tags.join('+') + '+'
                    text = text.replaceAll('&','%26');
                    text = text.replaceAll('+','%2B');
                    text = text.replaceAll('=','%3D')
                    const user_test = await translateapi(text,source_lang,target_lang);
                    const translated_user = user_test['translated Text'];
                    if(translated_user === undefined)
                    {
                        return;
                    }
                    const users_data = translated_user?.split("+");
                    const name = users_data!==undefined ? users_data[0]:null;
                    let about = null;
                    let tags = [];
                    let badge = []
                    let bindex = 1;
                    let tindex = 1;
                    if(user.about !== undefined)
                    {
                        about = users_data[1];
                        bindex = 2;
                    }
                       
                    if(user.badge.length>0)
                    {
                        tindex = bindex+user.badge.length+1;
                        badge = users_data.slice(bindex,tindex-1);
                    }
                    if(user.tags.length>0)
                    {
                        tags = users_data.slice(tindex-1);
                    }
                    const new_user = {...user,name,about,tags,badge};
                    return new_user;
                })
            )
            if(change_data!==undefined && change_data[0]!==undefined){
            dispatch({type:'FETCH_USERS',payload:change_data})
            return;
            }
        }

        dispatch({type:'FETCH_USERS', payload:data})
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = (id, updateData) => async (dispatch) =>{
    try {
        let {data} = await api.updateProfile(id,updateData)
        const target_lang = localStorage.getItem('i18nextLng');
        if(target_lang !== 'en' && target_lang!==null)
        {
            let text = '';
            text += data.name + '+';
            if(data.about!==undefined)
                text+=   data.about + '+';
            if(data.badge.length>0)
             text+=  data.badge.join('+') + '+';
            if(data.tags.length>0)
                text+=  data.tags.join('+') + '+'
                    text = text.replaceAll('&','%26');
                    text = text.replaceAll('+','%2B');
                    text = text.replaceAll('=','%3D')
            
                    const user_test = await translateapi(text,'en',target_lang);
                    const translated_user = user_test['translated Text'];
                    // console.log(translated_user);
                    const users_data = translated_user.split("+");
                    // console.log(users_data);
                    const name = users_data[0];
                    let about = null;
                    let tags = [];
                    let badge = []
                    let bindex = 1;
                    let tindex = 1;
                    if(data.about !== undefined)
                    {
                        about = users_data[1];
                        bindex = 2;
                    }
                       
                    if(data.badge.length>0)
                    {
                        tindex = bindex+data.badge.length+1;
                        badge = users_data.slice(bindex,tindex-1);
                    }
                    if(data.tags.length>0)
                    {
                        tags = users_data.slice(tindex-1);
                    }
                    const new_data = {...data,name,about,tags,badge};

                dispatch({type:'UPDATE_CURRENT_USER',payload:new_data});
                return ;
        }
        dispatch({type:'UPDATE_CURRENT_USER', payload: data})
    } catch (error) {
        console.log(error)
    }
}
export const subscribed = (id,plan) => async(dispatch)=>{
    try
    {
        let {data} = await api.subscribe(id,plan);
        // console.log(data);
        const user = JSON.parse(localStorage.getItem('Profile'));
        // console.log(user);
        // dispatch({type:'AUTH',data});
       const new_user = {result:data.result,token:user['token']}
       dispatch({type:'AUTH',data:new_user});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

    }catch(error)
    {
        console.log(error);
    }
}