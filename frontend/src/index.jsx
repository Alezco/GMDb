import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers.jsx';
import SignIn from './signIn.jsx';

let store = createStore(Reducer);

render(<Provider store={store}><SignIn /></Provider>, document.getElementById('root'));
