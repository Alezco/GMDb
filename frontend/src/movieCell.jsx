import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from './style/index.css';
import { withRouter } from 'react-router';

class MovieCell extends Component {

  constructor(props) {
    super(props);
    const { router, params, location, routes } = this.props
    this.likeAction = this.likeAction.bind(this);

    this.lockLikeAnimation = false;

    let self = this;
    this.state = {
      style : "faveNotLike",
      isLike : false
    };
    if (!this.props.favorites){

    } else {
      console.log(this.props.favorites);
      console.log(this.props.movieObject.id);
    if (this.props.favorites.filter(function(fav){ console.log(fav.id); console.log(self.props.movieObject.id); return fav.id === self.props.movieObject.id }))
    {
      this.state = {
        style : "faveNotLike",
        isLike : false
      };
    }
  }
}

  componentWillReceiveProps(Newprops) {
    console.log("MY CELL receive new props");
    console.log(Newprops);
    if (!Newprops.favorites) {
      return;
    }
    if (Newprops.favorites.filter(function(fav){ return fav.id === Newprops.movieObject.id }))
    {
      console.log("is MY FAVORITe");
      this.setState({
        style : "faveAnimationLike faveNotLike",
        isLike : true
      });
    }
    else {
      console.log("is NOT MY FAVORITe");
      this.setState({
        style : "faveAnimationUnlike faveLike",
        isLike : false
      });
    }
  }

  WebServiceCall(movieID)
  {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
         console.log("like all good");
        }
    }
    req.open('POST', 'http://localhost:4242/api/like', true);
    req.setRequestHeader("Content-Type", "application/json");
    let jsonToSend = JSON.stringify({"movieID": movieID});
    req.send(jsonToSend);
  }

  removeLock(self) {
    self.lockLikeAnimation = false;
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
    this.WebServiceCall(this.props.movieObject.id);
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
    favorites: state.favorites
  };
}



export default Redux.connect(mapStateToProps)(MovieCell);
