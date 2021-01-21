import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import progress from './state/progress';
import snackbars from './state/snackbars';
import images from './state/images';
import user from './state/user';

const reducer = combineReducers({
    progress, snackbars, images, user, 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
