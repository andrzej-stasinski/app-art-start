// STATE
const initialState = {
    spinner: [],
}

// ACTIONS
const ADD_SPINNER = 'ADD_SPINNER';
const REMOVE_SPINNER = 'REMOVE_SPINNER';

// REDUCER
const progress = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SPINNER:
            return {
                ...state,
                spinner: [...state.spinner, true],
            }
        case REMOVE_SPINNER:
            return {
                ...state,
                spinner: state.spinner.filter((item, index) => index !== 0),
            }
        default:
            return state;
    }
};
export default progress;

// CREATOR ACTIONS
const addSpiner = () => ({type:ADD_SPINNER})
const removeSpiner = () => ({type:REMOVE_SPINNER})
export const spinnerProgress = {
    add: addSpiner,
    remove: removeSpiner,
}