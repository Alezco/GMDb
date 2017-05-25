import React, { Component } from 'react';
import {render} from 'react-dom';

class Controler extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      url : ""
    };
  }


  handleClick() {
    if (this.state.url) {
      let urlimage = document.getElementById("urlcontent");
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", 'http://localhost:4242/api/pictures');
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify({picture:""+this.state.url}));
      urlimage.value = ""
      this.setState({ url : "" });
      window.location.reload();
    }
  }

  handleChange(event) {
    if (event.target.value != undefined) {
      this.setState({url: event.target.value});
    }
  }

  render() {
    return(
      <div>
        Url : <input type="text" value={this.state.url} name="fname" id="urlcontent" onChange={(e) => this.handleChange(e)}/><br />
      <button type="button" onClick={() => this.handleClick()} id="sendMyImage">Upload</button>
      </div>
      );
  }
}
export default Controler;
