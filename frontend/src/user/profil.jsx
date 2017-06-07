import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from '../style/index.css';
import NavBar from '../global/navBar.jsx';
import MovieCell from '../movieCell/movieCell.jsx';
import MovieList from '../home/movieList.jsx';
import NotFound from '../global/notFound.jsx';
import Footer from '../global/footer.jsx';
import SearchForm from '../home/searchForm.jsx';

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : null,
      filteredMovies : null
    }
  }

  componentWillReceiveProps(Newprops) {
    if (Newprops.username >= 0) {
    } else {
      this.props.router.push('/login');
    }
  }

  render() {
    console.log(this.props.favorites);
    if (this.props.favorites == null || this.props.favorites.info) {
      return (
        <div>
          <NavBar />
          <p>No movies in your favorites</p>
        </div>
      );
    }
    else {
      let rows = [];
      this.props.favorites.map((row, id) => {
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
                  <h1>Hello {this.props.user.login}, these are your favorites movies</h1>
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

const mapStateToProps = (state, router)  => {
  return {
    username: state.username,
    favorites : state.favorites,
    user: state.user
  };
}

export default Redux.connect(mapStateToProps)(Profil);
