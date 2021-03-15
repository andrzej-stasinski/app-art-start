
// INITIAL STATE
const initialState = {
    user: '',
    isLogged: false,
}

// ACTIONS
const ADD_USER = 'ADD_USER';
const ADD_LOGGED = 'ADD_LOGGED';

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            return {
                ...state, user: action.payload,
            }
        }
        case ADD_LOGGED: {
            return {
                ...state, isLogged: action.payload,
            }
        }
        default:
            return state;
    }
};

// CREATOR ACTIONS
export const addUser = (user) => ({type:ADD_USER, payload:user})

// wykorzystywany - Chat.js
export const setIsLogged = (bool) => ({type:ADD_LOGGED, payload:bool})

