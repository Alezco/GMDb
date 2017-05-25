import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers.jsx';
import Authentification from './authentification.jsx';

let store = createStore(Reducer);

render(<Provider store={store}><Authentification /></Provider>, document.getElementById('root'));
