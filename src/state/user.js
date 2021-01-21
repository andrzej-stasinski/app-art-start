
// INITIAL STATE
const initialState = {
    user: 'ala',
}

// ACTIONS
const ADD_USER = 'ADD_USER';

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER: {
            return {
                ...state, user: action.payload,
            }
        }
        default:
            return state;
    }
};

// CREATOR ACTIONS
export const addUser = (user) => ({type:ADD_USER, payload:user})

