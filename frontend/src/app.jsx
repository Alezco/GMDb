
import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
            My App
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
