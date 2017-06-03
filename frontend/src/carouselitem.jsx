import React, { Component } from 'react';
import {render} from 'react-dom';

class CarouselItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
            <div className="col-sm-3"><a href="#x">
                <img src={this.props.movieObject.Poster} alt="Image" className="img-responsive"/></a>
            </div>
      </div>
      );
  }
}

export default CarouselItem;
