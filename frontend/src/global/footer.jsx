import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from '../style/index.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="page-footer center-on-small-only">
        <div className="container-fluid">
          <p className="title">EPITA MTI 2018 GOOD MOVIES DATABASE (GMDb)</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
