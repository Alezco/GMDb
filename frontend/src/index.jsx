import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, browserHistory, Route } from 'react-router';
import Reducer from './reducers.jsx';
import Authentification from './authentification.jsx';
import HomePage from './homePage.jsx';


let store = createStore(Reducer);

//render(<Provider store={store}><Authentification /></Provider>, document.getElementById('root'));
render(<Provider store={store}>
            <HomePage />
        </Provider>,
document.getElementById('root'));
