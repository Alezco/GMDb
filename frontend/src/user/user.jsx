import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from '../style/index.css';
import { withRouter } from 'react-router';
const Redux = require('react-redux');
import NavBar from '../global/navBar.jsx';
import MovieCell from '../movieCell/movieCell.jsx';
import Footer from '../global/footer.jsx';
const api = require('../api/user.js');

class User extends Component {
  constructor(props) {
    super(props);

    const { router, params, location, routes } = this.props

    this.OnUserByIDResponse = this.OnUserByIDResponse.bind(this);
    this.getUserFavoritesResponse = this.getUserFavoritesResponse.bind(this);

    this.state = {
      userID : this.props.routeParams.id,
      userObject : null,
      favorites : null
    }
  }

  getUserFavoritesResponse(err, res) {
    if (err) {
      this.props.router.push(err);
    } else {
      this.setState({
        userID : this.state.userID,
        userObject : this.state.userObject,
        favorites : res
      });
    }
  }

  getUserFavorites(userID) {
    api.getFavoritesOfUser(userID, this.getUserFavoritesResponse)
  }

  OnUserByIDResponse(err, res) {
    if (err) {
      this.props.router.push(err);
    } else {
      this.setState({
        userID : this.state.userID,
        userObject : res,
        favorites : this.state.favorites
      });
      this.getUserFavorites(this.state.userID);
    }
  }

  componentWillMount() {
    api.getUserByID(this.state.userID, this.OnUserByIDResponse)
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
