import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from '../style/index.css';
import NavBar from '../global/navBar.jsx';
import Footer from '../global/footer.jsx';
const api = require('../api/authentification.js');

const SET_USER_ID = 'SET_USER_ID';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRePassword = this.handleRePassword.bind(this);
    this.SignUpResponse = this.SignUpResponse.bind(this);
    this.SignUp = this.SignUp.bind(this);

    this.state = {
      login: '',
      password: '',
      rePassword: '',
      formError: ''
    }
  }

  SignUpResponse(err, res) {
    if (err) {
      this.setState({formError: err});
    }
    else {
      this.setState({formError: res});
    }
  }

  SignUp() {
    let login = this.state.login;
    let password = this.state.password;
    let rePassword = this.state.rePassword;
    if (password == rePassword) {
      api.SignUp(login, password, this.SignUpResponse);
    } else {
      this.setState({formError: 'Passwords not matching'});
    }
  }

  handleLogin(event) {
    this.setState({
      login: event.target.value,
      password: this.state.password,
      rePassword: this.state.rePassword,
      formError: this.state.formError
    });
  }

  handlePassword(event) {
    this.setState({
      login: this.state.login,
      password: event.target.value,
      rePassword: this.state.rePassword,
      formError: this.state.formError
    });
  }

  handleRePassword(event) {
    this.setState({
      login: this.state.login,
      password: this.state.password,
      rePassword: event.target.value,
      formError: this.state.formError
    });
  }

  render() {
    let error = null;
    if (this.state.formError) {
      error = <div>
        <h4>
          <span className="badge badge-default">{this.state.formError}</span>
        </h4>
      </div>
    }
    return(
      <div>
        <NavBar />
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div className="well well-sm customCard">
              <div className="card-block">
                <div className="text-center">
                  <h3>Register</h3>
                  <hr className="mt-2 mb-2"/>
                </div>
                {error}
                <div className="md-form">
                  <i className="fa fa-user prefix"></i>
                  <input type="text" id="form2" className="form-control" placeholder="Login" required onChange={this.handleLogin}/>
                </div>
                <div className="md-form">
                  <i className="fa fa-lock prefix"></i>
                  <input type="password" id="form4" className="form-control" placeholder="Password" required onChange={this.handlePassword}/>
                </div>
                <div className="md-form">
                  <i className="fa fa-lock prefix"></i>
                  <input type="password" id="form4" className="form-control" placeholder="Repeat password" required onChange={this.handleRePassword}/>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" id="submitBtn" type="submit" onClick={this.SignUp}>Register</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
          );
        }
      }

      const mapStateToProps = (state)  => {
        return {
          state : state
        };
      }

      export default Redux.connect(mapStateToProps)(RegisterForm);
