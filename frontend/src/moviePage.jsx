import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');

import NavBar from './navBar.jsx';
import Footer from './footer.jsx';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : null
    };
  }

  render() {
      return(
        <div>
          <NavBar />
          MoviePage
        </div>
      );
    }
  }
}

export default MovieList;
