import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class SignIn extends Component {

  constructor(props) {
    super(props);

  }

  checkSignIn(event)
  {
    let login = document.getElementById("login").value;
    let password =document.getElementById("password").value;
    let rePassword = document.getElementById("rePassword").value;
    console.log(login);
    console.log(password);
    console.log(rePassword);
    if (password == rePassword)
    {
      let req = new XMLHttpRequest();
      req.open('POST', 'http://localhost:4242/signIn?username='+login+'&'+'password='+password, true);
      req.send();
    }
    else {
      let errorLabel = document.createElement("label");
      errorLabel.style.color = "dark-red";
      errorLabel.innerHTML = "Password not matching!"
      document.getElementById("root").appendChild(errorLabel);
    }
  }

  render() {
    return(
    <div>
      <div className="form">
          <ul className="tab-group">
            <li className="tab active">Sign Up</li>
            <li className="tab">Log In</li>
          </ul>
          <div className="tab-content">
            <div id="signup">
              <h1>Sign Up for Free</h1>

                  <div className="field-wrap">
                    <input type="text"required placeholder="Login *" id="login"/>
                  </div>
                  <div className="field-wrap">
                    <input type="password"required placeholder="Password *" id="password"/>
                  </div>
              <div className="field-wrap">
                <input type="password"required placeholder="Repeat Password *" id="rePassword"/>
              </div>
              <button type="submit" className="button button-block" onClick={e => this.checkSignIn(e)}>Get Started</button>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>

      );
  }
}

export default SignIn;
