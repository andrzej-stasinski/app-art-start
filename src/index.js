import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {store} from './store';

// Spinner test
import {spinnerProgress} from './state/progress';

store.dispatch(spinnerProgress.add());
setTimeout(() => {
  store.dispatch(spinnerProgress.remove());
}, 500);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
};

// url ok 
export const DATABASE_URL = firebaseConfig.databaseURL;
// if error
// export const DATABASE_URL = "https://XXXXXXXXxxx.firebaseio.com";

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />      
    </Provider>
  </React.StrictMode>,
  // <div>
  //   <Provider store={store}>
  //     <App />      
  //   </Provider>
  // </div>,
  document.getElementById('root')
);

