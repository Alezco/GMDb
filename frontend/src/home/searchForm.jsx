import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from '../style/index.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFilterType = this.handleChangeFilterType.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchTxt : null
    };
  }

  searchByName() {
    console.log("changes");
    if (document.forms[0]) {
      this.state.searchTxt = document.forms[0].search.value;
      this.props.onKeyUp(document.forms[0].search.value);
    }
    else {
      this.props.onKeyUp(null);
    }
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
    if (event.target.value) {
      this.props.onKeyUp(event.target.value);
    }
    else {
      this.props.onKeyUp(null);
    }
  }

  render() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-lg-offset-3">

              <form className="form-inline">

                <div className="md-form input-group">
                  <div className="input-group-btn search-panel">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                      <span id="search_concept">Filter by</span>
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#contains">Contains</a></li>
                      <li><a href="#its_equal">It's equal</a></li>
                      <li><a href="#greather_than">Greather than</a></li>
                      <li><a href="#less_than">Less than</a></li>
                      <li className="divider"></li>
                      <li><a href="#all">Anything</a></li>
                    </ul>
                  </div>
                  <div className="md-group form-group">
                    <input type="hidden" name="search_param" value="all" id="search_param" onChange={this.handleChangeFilterType}/>
                  </div>
                  <div className="md-group form-group">
                    <input type="text" className="form-control" name="x" placeholder="Search term..." onChange={this.handleChange} />
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
