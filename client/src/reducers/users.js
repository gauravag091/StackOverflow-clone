const usersReducer = (states = [], action) =>{
    switch (action.type) {
        case 'FETCH_USERS':
            // window.location.reload(false);
            return action.payload
        case 'UPDATE_CURRENT_USER':
            const test =  states.map((state) => state._id === action.payload._id ? action.payload : state);
            return test;
        case 'SUBSCRIBE':
            return action.payload;
        default:
            return states
    }
}
export default usersReducer