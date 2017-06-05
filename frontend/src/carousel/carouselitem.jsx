import React, { Component } from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

class CarouselItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let route = "/detail/"+this.props.movieObject.id
    return(
      <div>
            <div>
              <Link to={route}>
                <img src={this.props.movieObject.Poster} alt="Image" className="img-responsive small-img"/>
              </Link>
            </div>
      </div>
      );
  }
}

export default CarouselItem;
