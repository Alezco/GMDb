
import React, { Component } from 'react';
import {render} from 'react-dom';
import styles from './app.css';

const Redux =require('react-redux');


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="app">
            <p>My App</p>
       </div>
      );
  }
}

const mapStateToProps = (state)  => {
  return {
    images: state
  };
}

export default App;
