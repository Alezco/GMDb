import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';
import MyNavItem from './myNavItem.jsx';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  checkSign()
  {
    if (this.state.activeIndex === 0)
    {
      this.checkSignUp();
    }
    else
    {
      this.checkSignIn();
    }
  }

  checkSignIn()
  {
    console.log("SignIn clicked!");
  }

  checkSignUp()
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
        req.open('POST', 'http://localhost:4242/logIn', true);
        req.setRequestHeader("Content-Type", "application/json");
        let jsonToSend = JSON.stringify({"login": login, "pwd": password});
        req.send(jsonToSend);
    }
    else
    {
      let errorLabel = document.createElement("label");
      errorLabel.innerHTML = "Password not matching!";
      document.getElementById("root").appendChild(errorLabel);
    }
  }

  handleClick(index)
  {
    let title = document.getElementById('title');
    let rePassDiv = document.getElementById('rePassDiv');
    let submitBtn = document.getElementById('submitBtn');

    if (this.state.activeIndex === 0)
    {
      title.innerHTML = "Enter Your Login Now";
      rePassDiv.style.visibility = "hidden";
    }
    else
    {
      title.innerHTML = "Sign Up For Free";
      rePassDiv.style.visibility = "visible";
    }
    this.setState({activeIndex: index});
  }

  render() {
    return(
    <div>
      <div className="form">
          <ul className="tab-group">
            <MyNavItem content="Sign up" index={0} isActive={this.state.activeIndex===0} onClick={this.handleClick.bind(this)}/>
            <MyNavItem content="Log In" index={1} isActive={this.state.activeIndex===1} onClick={this.handleClick.bind(this)}/>
          </ul>
          <div className="tab-content">
            <div id="signup">
              <h1 id="title">Sign Up For Free</h1>

                  <div className="field-wrap">
                    <input type="text"required placeholder="Login *" id="login"/>
                  </div>
                  <div className="field-wrap">
                    <input type="password"required placeholder="Password *" id="password"/>
                  </div>
              <div className="field-wrap" id="rePassDiv">
                <input type="password"required placeholder="Repeat Password *" id="rePassword"/>
              </div>
              <button id="submitBtn" type="submit" className="button button-block" onClick={this.checkSign.bind(this)}>Get Started</button>
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
