import React, { Component } from 'react';
import {render} from 'react-dom';

class CloseImage extends Component {
  constructor(props) {
    super(props);

    this.deleteImage = this.deleteImage.bind(this);
  }

  deleteImage() {
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("DELETE", 'http://localhost:4242/api/pictures/'+this.props.index);
      xmlhttp.send();

      //delete image in dom
      this.props.callback();
  }

  render() {
    return(
          <button className="myButton" onClick={this.deleteImage}>X</button>
      );
  }
}
export default CloseImage;
