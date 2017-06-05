import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
import styles from '../style/index.css';

class MyNavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp : true,
      signIn : false
    };
  }

  handleClick() {
    this.props.onClick(this.props.index);
  }

  render() {
    return(
      <li className={this.props.isActive ? 'tab active' : 'tab'} onClick={this.handleClick.bind(this)}>{this.props.content}</li>
    );
  }
}

export default MyNavItem;
