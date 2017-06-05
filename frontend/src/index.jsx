import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, browserHistory, Route } from 'react-router';
import Reducer from './reducer/reducers.jsx';
import Authentification from './authentification/authentification.jsx';
import HomePage from './home/homePage.jsx';

let store = createStore(Reducer);

render(<Provider store={store}><HomePage /></Provider>, document.getElementById('root'));
