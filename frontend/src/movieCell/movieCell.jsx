import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from '../style/index.css';
import { withRouter, Link } from 'react-router';
const api = require('../api/content.js');

class MovieCell extends Component {

  constructor(props) {
    super(props);

    this.likeAction = this.likeAction.bind(this);
    this.likeActionResponse = this.likeActionResponse.bind(this);
    this.lockLikeAnimation = false;

    if (!this.props.favorites) {
      this.state = {
        style : "faveNotLike",
        isLike : false,
        link : "/detail/"+this.props.movieObject.id
      };
    }
    else {
      this.setFavoriteStyle(this.props);
    }
  }

  setFavoriteStyle(MyProps)
  {
    for (var i = 0; i < MyProps.favorites.length; i++) {
      if (MyProps.favorites[i].movieID == MyProps.movieObject.id) {
        this.state = {
          style : "faveLike",
          isLike : true,
          link :"/detail/"+MyProps.movieObject.id
        };
        return;
      }
    }
    this.state = {
      style : "faveNotLike",
      isLike : false,
      link :"/detail/"+MyProps.movieObject.id
    };
  }

  componentWillReceiveProps(Newprops) {
    if (!Newprops.favorites) {
      return;
    }
    this.setFavoriteStyle(Newprops);
  }

  likeActionResponse(err, res) {
    if (err) {
      console.log(err);
    } else {
      if (res.res === "Liked") {
        this.props.dispatch({
          type: 'ADD_FAVORITES_MOVIE_ID',
          index: this.props.index,
          item: this.props.movieObject
        });
      } else {
        this.props.dispatch({
          type: 'REMOVE_FAVORITES_MOVIE_ID',
          item: this.props.movieObject
        });
      }
    }
  }

  WebServiceCall(movieID)
  {
    api.LikeAction(movieID, this.likeActionResponse)
  }

  removeLock() {
    this.lockLikeAnimation = false;
    this.WebServiceCall(this.props.movieObject.id);
  }

  likeAction()
  {
    if (!this.lockLikeAnimation) {
      this.lockLikeAnimation = true;
      setTimeout(() => { this.removeLock() }, 1500);
    }
    else {
      return;
    }

    if (this.state.isLike) {
      this.setState({
        style : "faveAnimationUnlike faveLike",
        isLike : false,
        link :this.state.link
      });
    } else {
      this.setState({
        style : "faveAnimationLike faveNotLike",
        isLike : true,
        link :this.state.link
      });
    }
  }

  render() {
    const divStyle = {
      height : '450px',
    };
    if (this.props.movieObject == null) {
      return(<div></div>);
    }
    if (this.props.username < 0) {
      return(
        <div>
          <div className="col-sm-6 col-md-3" style={divStyle}>
            <Link to={this.state.link}>
              <img className="img-responsive" src={this.props.movieObject.Poster} alt=""/>
            </Link>
            <div className="caption">
              <h4>{this.props.movieObject.Title}</h4>
            </div>
          </div>
        </div>
      );
    }
    return(
      <div>
        <div className="col-sm-6 col-md-3" style={divStyle}>
          <div className={this.state.style} onClick={this.likeAction}></div>
          <Link to={this.state.link}>
            <img className="img-responsive" src={this.props.movieObject.Poster} alt=""/>
          </Link>
          <div className="caption">
            <h4>{this.props.movieObject.Title}</h4>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, router)  => {
  return {
    username: state.username,
    favorites: state.favorites
  };
}

export default Redux.connect(mapStateToProps)(MovieCell);
