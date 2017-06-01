import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from './style/index.css';
import { withRouter } from 'react-router';

class MovieCell extends Component {

  constructor(props) {
    super(props);

    this.likeAction = this.likeAction.bind(this);
    this.lockLikeAnimation = false;

    let self = this;

    console.log("movie cell constructor");
    if (!this.props.favorites)
    {
      console.log("default style because redux not set");
      this.state = {
        style : "faveNotLike",
        isLike : false
      };
    }
    else
    {
      this.setFavoriteStyle(this.props);
    }
  }

  setFavoriteStyle(MyProps)
  {
    for (var i = 0; i < MyProps.favorites.length; i++) {
      console.log(MyProps.favorites[i].movieID +" == " +MyProps.movieObject.id);
      if (MyProps.favorites[i].movieID == MyProps.movieObject.id) {
        console.log("--------> favorite style Applied");
        this.state = {
          style : "faveLike",
          isLike : true
        };
        return;
      }
    }
    console.log("Default style Applied");
    this.state = {
      style : "faveNotLike",
      isLike : false
    };
  }


  componentWillReceiveProps(Newprops) {
    console.log("movie cell receive new props");
    if (!Newprops.favorites) {
      return;
    }
    this.setFavoriteStyle(Newprops);
  }

  WebServiceCall(movieID)
  {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    console.log(self.props);
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
         console.log("like / unlike action called");
         let val = JSON.parse(req.responseText);
         if (val.res === "Liked") {
           self.props.dispatch({
              type: 'ADD_FAVORITES_MOVIE_ID',
              index: self.props.index,
              item: self.props.movieObject
          });
         } else {
           self.props.dispatch({
              type: 'REMOVE_FAVORITES_MOVIE_ID',
              item: self.props.movieObject
           });
         }
         console.log(val);
        }
    }
    req.open('POST', 'http://localhost:4242/api/like', true);
    req.setRequestHeader("Content-Type", "application/json");
    let jsonToSend = JSON.stringify({"movieID": movieID});
    req.send(jsonToSend);
  }

  removeLock(self) {
    self.lockLikeAnimation = false;
    this.WebServiceCall(this.props.movieObject.id);
  }

  likeAction()
  {
    if (!this.lockLikeAnimation) {
      this.lockLikeAnimation = true;
      let self = this;
      setTimeout(function() { self.removeLock(self) }, 1500);
    }
    else {
      return;
    }

    if (this.state.isLike) {
      console.log("XD i unlike it");
      this.setState({
        style : "faveAnimationUnlike faveLike",
        isLike : false
      });
    } else {
      console.log("XD i like it");
      this.setState({
        style : "faveAnimationLike faveNotLike",
        isLike : true
      });
    }
  }

  render() {
    const divStyle = {
      height : '600px',
    };
    if (this.props.movieObject == null) {
      return(<div></div>);
    }
    if (this.props.username < 0) {
      return(
          <div>
            <div className="col-sm-6 col-md-3" style={divStyle}>
              <img className="img-responsive thumbnail" src={this.props.movieObject.Poster} alt=""/>
              <div className="caption">
                <h4>{this.props.movieObject.Title}</h4>
                <p>{this.props.movieObject.Plot}</p>
              </div>
            </div>
          </div>
        );
    }
    return(
        <div>
          <div className="col-sm-6 col-md-3" style={divStyle}>
            <div className={this.state.style} onClick={this.likeAction}></div>
            <img className="img-responsive thumbnail" src={this.props.movieObject.Poster} alt=""/>
            <div className="caption">
              <h4>{this.props.movieObject.Title}</h4>
              <p>{this.props.movieObject.Plot}</p>
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
