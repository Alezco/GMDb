import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from '../style/index.css';

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loader"></div>
    );
  }
}

export default Loader;
