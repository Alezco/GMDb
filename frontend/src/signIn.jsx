import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class SignIn extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
    <div>
      <div className="form">
          <ul className="tab-group">
            <li className="tab active"><a href="#signup">Sign Up</a></li>
            <li className="tab"><a href="#login">Log In</a></li>
          </ul>

          <div className="tab-content">
            <div id="signup">
              <h1>Sign Up for Free</h1>

              <form action="/" method="post">
                  <div className="field-wrap">
                    <label>Login<span className="req">*</span></label>
                    <input type="text"required autocomplete="off"/>
                  </div>
                  <div className="field-wrap">
                    <label>Set A Password<span className="req">*</span></label>
                    <input type="password"required autocomplete="off"/>
                  </div>
              <div className="field-wrap">
                <label>Repeat The Password<span className="req">*</span></label>
                <input type="password"required autocomplete="off"/>
              </div>
              <button type="submit" className="button button-block">Get Started</button>
            </form>
          </div>

          <div id="login">
            <h1>Welcome Back!</h1>
            <form action="/" method="post">
                <div className="field-wrap">
                  <label>Email Address<span className="req">*</span></label>
                  <input type="email"required autocomplete="off"/>
                </div>

                <div className="field-wrap">
                  <label>Password<span className="req">*</span></label>
                  <input type="password"required autocomplete="off"/>
                </div>
                <p className="forgot"><a href="#">Forgot Password?</a></p>
                <button className="button button-block">Log In</button>
            </form>
          </div>

        </div>
      </div>
    </div>

      );
  }
}

export default SignIn;
