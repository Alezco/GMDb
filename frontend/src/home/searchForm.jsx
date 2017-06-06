import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux =require('react-redux');
import styles from '../style/index.css';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFilterType = this.handleChangeFilterType.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // TODO
  handleChangeFilterType(event) {
    if (event.target.value) {
      //this.props.onKeyUp(event.target.value);
    }
    else {
      //this.props.onKeyUp(null);
    }
  }

  handleChange(event) {
    console.log(event.target.value);
    this.props.onKeyUp(event.target.value);
  }


  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-lg-offset-3">
              <form className="form-inline">
                <div className="md-form input-group">
                  <div className="md-group form-group">
                    <input type="text" className="form-control" placeholder="Search for movies ..." onChange={this.handleChange} />
                  </div>
                  <span className="md-group form-group">
                    <button className="btn btn-primary" type="button">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
