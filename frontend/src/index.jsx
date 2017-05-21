import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app.jsx';
import Reducer from './reducers.jsx';

let store = createStore(Reducer);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
