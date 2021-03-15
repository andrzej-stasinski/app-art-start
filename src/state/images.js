import {DATABASE_URL} from '../index';
import {spinnerProgress} from './progress';
import {addSnack} from './snackbars';

// INITIAL STATE
const initialState = {
    images: [],
    isError: false,
}

// ACTIONS
const ADD_IMAGES = 'ADD_IMAGES';
const ERROR_ON_GET = 'ERROR_ON_GET';

// REDUCER
const images = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMAGES:
            return {
                ...state,
                images: action.payload,
                isError: false,
            } 
        case ERROR_ON_GET:
            return {
                ...state,
                isError: true,
            }
        default:
            return state;
    }
};
export default images;

const addImages = (img) => ({type: ADD_IMAGES, payload: img});
const setError = () => ({type: ERROR_ON_GET})

// CREATOR ACTIONS
export const getImages = () => dispatch => {
    // dispatch(spinnerProgress.add());
    fetch(`${DATABASE_URL}/images.json`)
        .then(res => {
            if(res.ok === false) throw Error(res);
            return res.json()
        })
        .then(data => {
            // console.log(data);
            const dataArr = data 
            ? Object.keys(data).map(key => ({id: key, ...data[key]}))
            : [];
            // console.log(dataArr);
            // reverse
            const reverseData = dataArr.reverse()
            dispatch(addImages(reverseData));
            // bez reverce
            // dispatch(addImages(dataArr));
            dispatch(spinnerProgress.remove());
            dispatch(addSnack('Pobrano dane'));
        })
        .catch(err => {
            // console.log(err);
            dispatch(setError());
            dispatch(spinnerProgress.remove());
            dispatch(addSnack('Błąd pobrania danych', 'danger'));
        })
}

























