import React, { Component } from 'react';
import {render} from 'react-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div onClick={this.props.dismissModal} id="myModal" className="modal" style={{ display : this.props.visible}}>
        <img className="modal-content" id="img01" src={this.props.source}/>
      </div>
    );
  }
}
export default Modal;
