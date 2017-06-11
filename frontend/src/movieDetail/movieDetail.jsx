import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from '../style/index.css';
import { withRouter } from 'react-router';
import NavBar from '../global/navBar.jsx';
import Modal from './modal.jsx'
import Carousel from '../carousel/carousel.jsx'
import Footer from '../global/footer.jsx';
import LikeButton from './likeButton.jsx'
const api = require('../api/content.js');

class MovieDetail extends Component {

  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.GetMovieDetailResponse = this.GetMovieDetailResponse.bind(this);

    const { router, params, location, routes } = this.props

    this.state = {
      movieID : this.props.routeParams.id,
      movieObject : null,
      modalStyle : "none"
    }
  }

  componentWillReceiveProps(NewProps) {
    if (NewProps.location != this.props.location) {
    this.setState({
      movieID : NewProps.routeParams.id,
      movieObject : null,
      modalStyle : "none"
    }, () => {
      this.updateMovieDetail();
    });
  }
}

  dismissModal() {
    this.setState({
      movieID : this.state.movieID,
      movieObject : this.state.movieObject,
      modalStyle : "none"
    });
  }

  showModal() {
    this.setState({
      movieID : this.state.movieID,
      movieObject : this.state.movieObject,
      modalStyle : "block"
    });
  }

  GetMovieDetailResponse(err, res) {
    if (err) {
      his.props.router.push(err);
    } else {
      this.setState(
        {
          movieID : this.state.movieID,
          movieObject : res[0],
          modalStyle : "none"
        }
      );
      console.log(this.state.movieObject);
    }
  }

  updateMovieDetail() {
    api.GetMovieDetail(this.state.movieID, this.GetMovieDetailResponse);
  }

  componentWillMount() {
    this.updateMovieDetail();
  }



  render() {
    if (!this.state.movieObject) {
      return (<div></div>);
    }
    return (
      <div>
        <NavBar />
        <Modal dismissModal={this.dismissModal} visible={this.state.modalStyle} source={this.state.movieObject.Poster}/>
        <div className="container">
          <div className="well well-sm customCard">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="details col-md-6">
                    <h1 className="product-title">{this.state.movieObject.Title}</h1>
                </div>
                <div className="details col-md-6">
                { this.props.username !== -1 ?
                  <LikeButton favorites={this.props.favorites} movieObject={this.state.movieObject} index={this.props.index}></LikeButton>
                 :
               <div></div>
               }
             </div>
              </div>
              <div className="wrapper row">
                <div className="col-md-6">
                  <img onClick={this.showModal} className="center-img" src={this.state.movieObject.Poster} />
                </div>
                <div className="details col-md-6">
                  <p className="product-description">
                    <strong>Plot: </strong>
                    {this.state.movieObject.Plot}
                  </p>
                  <p className="product-description">
                    <strong>Actors: </strong>
                    {this.state.movieObject.Actors}
                  </p>
                  <p className="product-description">
                    <strong>Awards: </strong>
                    {this.state.movieObject.Awards}
                  </p>
                  <p className="product-description">
                    <strong>Country: </strong>
                    {this.state.movieObject.Country}
                  </p>
                  <p className="product-description">
                    <strong>Director: </strong>
                    {this.state.movieObject.Director}
                  </p>
                  <p className="product-description">
                    <strong>Genre: </strong>
                    {this.state.movieObject.Genre}
                  </p>
                  <p className="product-description">
                    <strong>Language: </strong>
                    {this.state.movieObject.Language}
                  </p>
                  <p className="product-description">
                    <strong>Metascore: </strong>
                    {this.state.movieObject.Metascore}
                  </p>
                  <p className="product-description">
                    <strong>Released: </strong>
                    {this.state.movieObject.Released}
                  </p>
                  <p className="product-description">
                    <strong>Duration: </strong>
                    {this.state.movieObject.Runtime}
                  </p>
                </div>
              </div>
              <div className="wrapper row">
                <div className="center-img videoPadding">
                  <h3>Movie trailer</h3>
                  <iframe
                    allowFullScreen
                    frameBorder="0"
                    height="420"
                    src={this.state.movieObject.Youtube}
                    width="746"
                    />
                </div>
              </div>
              <Carousel username={this.props.username} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, router) => {
  return {
    username: state.username
  }
};

export default withRouter(Redux.connect(mapStateToProps)(MovieDetail));
