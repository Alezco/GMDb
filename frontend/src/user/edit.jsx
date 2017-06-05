import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');

import NavBar from '../global/navBar.jsx';
import Footer from '../global/footer.jsx';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.updateUrl = this.updateUrl.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      url : ''
    }
  }

  componentWillReceiveProps(newProps) {
    console.log("new props");
    console.log(newProps);
  }

  handleChange(event) {
      this.setState({url: event.target.value});
    }

  checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  updateUrl() {
      console.log("updating url " + this.state.url);
      if (!this.checkURL(this.state.url)) {
        console.log("Url is not valid");
        return;
      }
      let req = new XMLHttpRequest();
      req.withCredentials = true;
      let self = this;
      let user = this.props.user;
      user.url = this.state.url;
      req.onreadystatechange = function() {
          if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
            self.props.dispatch({
               type: 'UPDATE_USER',
               user: user
           });
          }
        }
        req.open('POST', 'http://localhost:4242/api/updateURL', true);
        req.setRequestHeader("Content-Type", "application/json");
        let jsonToSend = JSON.stringify({"url": this.state.url});
        req.send(jsonToSend);
      }

  render() {
    let favNumber = 0;
    if (this.props.favorites) {
      favNumber = this.props.favorites.length;
    }
    if (!this.props.user) {
      return(<div></div>);
    }
    console.log(this.props.user.url);
      return(
        <div>
          <NavBar />
            <div className="container">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src={this.props.user.url} alt="" className="img-rounded img-responsive profil-pic" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h4></h4>
                                    <p>
                                        <i className="glyphicon glyphicon-user"></i>{this.props.user.login}
                                        <br />
                                        <i className="glyphicon glyphicon-gift"></i>{favNumber}
                                        <br />
                                        <i className="glyphicon glyphicon-globe"></i>{this.props.user.url}
                                    </p>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row">
                                <div className="form-group">
                                <label className="control-label col-sm-2 black">New profil url:</label>
                                <div className="col-sm-10">
                                  <input onChange={this.handleChange} className="form-control" id="pwd" placeholder="Enter url"></input>
                                </div>
                              </div>
                            <br />
                              <div className="form-group">
                                  <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" onClick={this.updateUrl} className="btn btn-default">Submit</button>
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
