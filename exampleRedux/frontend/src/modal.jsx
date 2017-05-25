import React, { Component } from 'react';
import {render} from 'react-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return(
      <div id="myModal" className="modal" style={{ display : this.props.visible}}>
        <span className="close" onClick={this.props.dismissModal}  >×</span>
        <img className="modal-content" id="img01" src={this.props.source}/>
      </div>
      );
  }
}
export default Modal;
