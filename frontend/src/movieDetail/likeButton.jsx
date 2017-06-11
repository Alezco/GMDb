import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from '../style/index.css';
import { withRouter, Link } from 'react-router';
const api = require('../api/content.js');

class LikeButton extends Component {

  constructor(props) {
    super(props);

    this.likeAction = this.likeAction.bind(this);
    this.likeActionResponse = this.likeActionResponse.bind(this);

    this.state = {
      style : "null"
    }

  }

  componentWillMount() {
    this.refreshButtonStyle(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.refreshButtonStyle(nextProps);
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
      console.log("like dispatched");
      this.refreshButtonStyle(this.props);
    }
  }

  WebServiceCall(movieID)
  {
    api.LikeAction(movieID, this.likeActionResponse)
  }

  likeAction()
  {
    this.WebServiceCall(this.props.movieObject.id);
  }

  refreshButtonStyle(newProps) {
    console.log("refreshButtonStyle");
    console.log(newProps.favorites);
    console.log(newProps.movieObject);
    if (newProps.favorites && !newProps.favorites.info
      && newProps.favorites.filter(e => e.movieID == newProps.movieObject.id).length > 0) {
        console.log("yellow");
      this.setState(
        {
          style: "btn btn-yellow"
        }
      );
    }
      else {
        console.log("grey");
        this.setState(
          {
            style: "btn btn-grey"
          }
        );
      }
    }

  render() {
    return (
      <div className="action">
      <button className={this.state.style} type="button" onClick={this.likeAction}>
        <span className="fa fa-star"></span>
      </button>
    </div>
  );
}

}

const mapStateToProps = (state, router) => {
  return {
    username: state.username,
    favorites : state.favorites
  }
};

export default Redux.connect(mapStateToProps)(LikeButton);
