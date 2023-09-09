const translateReducer = (state = {data:null},action) =>{
    switch (action.type) {
        case 'TRANSLATE':
            return {...state,data:action.payload } 
        
        default:
            return state 
    }
}
export default translateReducer