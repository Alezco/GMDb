import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');


class SignIn extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div>
        <p>Fill the fields to sign in</p>
            <form>
              <input type="text" placeholder="Firstname"/><br/>
              <input type="text" placeholder="Lastname"/><br/>
              <input type="password" placeholder="Password"/>
            </form>
       </div>
      );
  }
}

export default SignIn;
