import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';
import MovieList from './movieList.jsx';
import Authentification from './authentification.jsx';
import NotFound from './notFound.jsx';
import Footer from './footer.jsx';
import SearchForm from './searchForm.jsx';

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : null,
      filteredMovies : null
    }
  }

  componentWillReceiveProps(Newprops) {
    console.log(Newprops);
    console.log("component will receive props !");
    if (Newprops.username >= 0) {
    } else {
      console.log("Not COnnected");
      console.log("No session found");
      console.log(this.props);
      this.props.router.push('/login');
    }
  }

  searchByName(name) {
    console.log(name);
    if (!name || name === '') {
      this.state.filteredMovies = this.state.movies;
    } else {
      let movies = this.state.movies;
      let tmp = [];
      for(let i = 0; i < movies.length; i++) {
        let movieName = movies[i].Title.toUpperCase();
        if (movieName.match(name.toUpperCase())) {
          tmp.push(movies[i]);
        }
      }
      this.setState({
        movies : this.state.movies,
        filteredMovies : tmp
      });
    }
  }

  render() {
    console.log('UPDATE MODAFUCKING PROFIL');
    console.log(this.props.favorites);
    if (this.props.favorites == null) {
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
                  <h1>Hello {this.props.username}, these are your favorites movies</h1>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <SearchForm movies={rows} onKeyUp={this.searchByName.bind(this)}/>
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
    favorites : state.favorites
  };
}



export default Redux.connect(mapStateToProps)(Profil);
