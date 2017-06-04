import React, { Component } from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Carousel from './carousel.jsx';


class DiscoverItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link : '/user/'+this.props.userObject.id
    }
  }

  render() {
    return(
      <div className="col-sm-6 col-md-3">
        <Link to={this.state.link}>
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
      </Link>
      </div>
      );
  }
}

export default DiscoverItem;
