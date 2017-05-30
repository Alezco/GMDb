import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './style/index.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="margin-tb-3">
        <div className="row">
          <div className="col-lg-12">
            <p>EPITA MTI 2018 GOOD MOVIE DATABASE (GMDb)</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
