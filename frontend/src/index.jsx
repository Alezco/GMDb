import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app.jsx';
import Reducer from './reducers.jsx';
import SignIn from './signIn.jsx';

let store = createStore(Reducer);

//render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
render(<Provider store={store}><SignIn /></Provider>, document.getElementById('root'));
