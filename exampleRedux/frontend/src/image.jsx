import React, { Component } from 'react';
import {render} from 'react-dom';
import CloseImage from './closeImage.jsx';
import Modal from './modal.jsx';

class Image extends Component {
  constructor(props) {
    super(props);

    this.removeImageFromDom = this.removeImageFromDom.bind(this);
    this.showModal = this.showModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);

    this.state = {
      visible : true,
      modalStyle : "none"
    };
  }

  removeImageFromDom() {
    this.setState({
      visible : false,
      modalStyle : "none"
    });
  }

  dismissModal() {
    console.log("dismissing modal");
    this.setState({
      visible : this.state.visible,
      modalStyle : "none"
    }, () => { console.log("modal style " + this.state.modalStyle) });
  }

  showModal() {
    console.log("showing modal");
      this.setState({
        visible : this.state.visible,
        modalStyle : "block"
      }, () => { console.log("modal style " + this.state.modalStyle) });
  }

  render() {
    console.log(this.props);
      return(
            <div className="inline">
            {  this.state.visible ? (
                <div className="MyImage"  id={this.props.index}>
                <img className="theImage" onClick={this.showModal} src={this.props.imageObject.picture} />
                <CloseImage callback={this.removeImageFromDom} index={this.props.imageObject.index}/>
                <Modal dismissModal={this.dismissModal} visible={this.state.modalStyle} source={this.props.imageObject.picture}/>
                </div>
            ) : null }
          </div>
        );
      }
}
export default Image;
