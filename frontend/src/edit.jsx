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
    if (!this.props.user) {
      return(<div></div>);
    }
      return(
        <div>
          <NavBar />
            <div className="container">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src={this.props.user.url} alt="" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h4></h4>
                                    <p>
                                        <i className="glyphicon glyphicon-user"></i>{this.props.user.login}
                                        <br />
                                        <i className="glyphicon glyphicon-gift"></i>nb_favrites
                                    </p>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row">
                                <div className="form-group">
                                <label className="control-label col-sm-2 black">New profil url:</label>
                                <div className="col-sm-10">
                                  <input className="form-control" id="pwd" placeholder="Enter url"></input>
                                </div>
                              </div>
                            <br />
                              <div className="form-group">
                                  <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-default">Submit</button>
                                  </div>
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
    favorites : state.favorites,
    user : state.user
  }
};



export default Redux.connect(mapStateToProps)(Edit);
