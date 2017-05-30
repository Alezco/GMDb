import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt : null
    };
  }

  searchByName() {
    if (document.forms[0]) {
      this.state.searchTxt = document.forms[0].search.value;
      this.props.onKeyUp(document.forms[0].search.value);
    }
    else {
      this.props.onKeyUp(null);
    }
  }

  render() {
    return(
      <div>
        <form>
          <div className="row margin-b-2">
            <input type="text" id="search" name="search" onKeyUp={this.searchByName.bind(this)} placeholder="Search for names.."></input>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
