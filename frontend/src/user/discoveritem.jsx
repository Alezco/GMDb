import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Carousel from '../carousel/carousel.jsx';
import {OverlayTrigger, Popover, Button } from 'react-bootstrap';
const Redux = require('react-redux');


class DiscoverItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link : '/user/'+this.props.userObject.id
    }
  }



  render() {
    const popoverHoverFocus = (
        <Popover id="popover-trigger-hover-focus" title="JS Joke">
          {this.props.jokes[Math.floor(Math.random() * this.props.jokes.length)]}
        </Popover>
    );
    return(
      <div className="col-sm-6 col-md-3">
        <Link to={this.state.link}>
          <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={popoverHoverFocus}>
          <div className="panel panel-blue userlist">
            <div className="panel-body text-center">
              <div className="userprofile">
                <div className="userpic">
                  <img src={this.props.userObject.url} alt="" className="userpicimg"></img>
                </div>
                <h3 className="username">{this.props.userObject.login}</h3>
                <p></p>
              </div>
              <p></p>
            </div>
          </div>
          </OverlayTrigger>
        </Link>
      </div>
    );
  }
}


      const mapStateToProps = (state, router) => {
        return {
          jokes: state.jokes
        }
      };



      export default Redux.connect(mapStateToProps)(DiscoverItem);
