import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './style/index.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">EPITA MTI 2018 GOOD MOVIES DATABASE (GMDb)</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
