import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './style/index.css';
import { withRouter } from 'react-router';
const Redux = require('react-redux');
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';
import Footer from './footer.jsx';

class User extends Component {
  constructor(props) {
    super(props);

    const { router, params, location, routes } = this.props

    this.state = {
      userID : this.props.routeParams.id,
      userObject : null,
      favorites : null
    }
  }

  getUserFavorites(userID) {
      let req = new XMLHttpRequest();
      req.withCredentials = true;
      let self = this;
      req.onreadystatechange = function() {
          if (req.status == 403) {
            console.log("Not Authorized");
            self.props.router.push('/login');
          }
          else {
                console.log("Authorized");
                if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
                  self.setState({
                    userID : self.state.userID,
                    userObject : self.state.userObject,
                    favorites : JSON.parse(req.responseText)
                  });
              }
         }
      }
      req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
      req.send(null);
  }

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
        if (req.status == 403) {
          console.log("Not Authorized");
          self.props.router.push('/login');
        }
        else {
              console.log("Authorized");
              if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
                self.setState({
                  userID : self.state.userID,
                  userObject : JSON.parse(req.responseText)[0],
                  favorites : self.state.favorites
                });
                self.getUserFavorites(self.state.userID);
            }
       }
    }
    req.open('GET', 'http://localhost:4242/api/user/'+this.state.userID, true);
    req.send(null);
  }

  render() {
    if (this.state.favorites == null) {
      return (
        <div>
          <NavBar />
          <p>No movies in your favorites</p>
        </div>
      );
    }
    else {
      let rows = [];
      this.state.favorites.map((row, id) => {
          row.id = row.movieID;
          rows.push(<MovieCell key={id} index={id} movieObject={row}/>);
      })
      console.log(this.state.userObject);
      return(
      <div>
        <NavBar />
        <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-header">
                  <h1>These are the favorite movies of {this.state.userObject.login}</h1>
                  </div>
              </div>
            </div>
            {rows}
        </div>
        <Footer />
      </div>
      );
    }
  }
}

const mapStateToProps = (state, router) => {
  return {
    username: state.username,
    favorites : state.favorites,
    user: state.user
  }
};



export default withRouter(Redux.connect(mapStateToProps)(User));
