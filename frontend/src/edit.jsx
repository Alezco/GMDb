import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');

import NavBar from './navBar.jsx';
import Footer from './footer.jsx';

class Edit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <div>
          <NavBar />
            <div className="container">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src="http://placehold.it/380x500" alt="" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h4>{this.props.username}</h4>
                                    <p>
                                        <i className="glyphicon glyphicon-user"></i>{this.props.username}
                                        <br />
                                        <i className="glyphicon glyphicon-gift"></i>nb_favrites
                                    </p>
                                    </div>
                                </div>
                            </div>
              </div>
        </div>
      );
    }
}

const mapStateToProps = (state, router) => {
  return {
    username: state.username,
    favorites : state.favorites
  }
};



export default Redux.connect(mapStateToProps)(Edit);
