// STATE
const initialState = {
    bars: [],
    // bars: [
    //     {text: 'message three', color: 'success', key: 1},
    //     {text: 'message four', color: 'danger', key: 2},        
    // ],
}

// ACTIONS
const ADD_SNACK = 'ADD_SNACK';
const REMOVE_SNACK = 'REMOVE_SNACK';

// REDUCER
const snackbars = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SNACK:
            return {
                ...state,
                bars: [
                    {text: action.text, color: action.color, key: action.key},
                    ...state.bars, 
                    ],
            }
        case REMOVE_SNACK:
            return {
                ...state,
                bars: state.bars.filter(item => item.key !== action.key)
            }
        default:
            return state;
    }
};
export default snackbars;

// CREATOR ACTIONS
const addSnackAction = (text, color, key) => ({type:ADD_SNACK, text:text, color:color, key: key})
const removeSnackAction = (key) => ({type:REMOVE_SNACK, key: key})

export const addSnack = (text, color='success') => (dispatch) => {
    const key = Date.now();
    // console.log(key);
    dispatch(addSnackAction(text, color, key));
    setTimeout(() => dispatch(removeSnackAction(key)), 3000);
}







