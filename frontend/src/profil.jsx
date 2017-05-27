import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';
import MovieList from './movieList.jsx';
import Authentification from './authentification.jsx';
import NotFound from './notFound.jsx';

class Profil extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies : null
    }
  }

  componentWillMount()
  {
    console.log("fetching user favorites emails");
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
      console.log('call back');
        if (req.status == 403) {
            console.log("Not Authorized");
            self.props.router.push('/login');
        }
        else {
          console.log("Authorized");
          if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
            console.log("movies received");
            self.setState({
              movies : JSON.parse(req.responseText)
            });
        }
      }
    }
      req.open('GET', 'http://localhost:4242/api/favorites/'+1, true);
      req.send(null);
  }

    render() {
      console.log("render profile");
      console.log(this.state.movies);
      if (this.state.movies == null)
      {
        return (<div>No movies in your favorites</div>);
      }
      else {
        console.log(this.state.movies);
        let rows = [];
        this.state.movies.map((row, id) => {
            console.log("in loop");
            rows.push(<MovieCell key={id} index={id} movieObject={row}/>);
        })
        return(
        <div>
          <NavBar />
          <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-header">
                    <h1>Hello, here are your favorites movies</h1>
                    </div>
                </div>
              </div>
              {rows}
              <footer className="margin-tb-3">
                <div className="row">
                  <div className="col-lg-12">
                    <p>EPITA MTI 2018 GREAT MOVIE DATABASE</p>
                  </div>
                </div>
              </footer>
          </div>
        </div>
        );
      }
    }
}
const mapStateToProps = (state)  => {
  return {
    state : state
  };
}

export default Redux.connect(
  mapStateToProps
)(Profil);
