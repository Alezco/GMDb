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

    this.state = {
      selected : "Title",
      hint : "Search for movies by title ..."
    }
  }

  handleChangeFilterType(event) {
    console.log(event.currentTarget.textContent);
    this.setState({
      selected : event.currentTarget.textContent,
      hint :"Search for movies by " + event.currentTarget.textContent+" ..."
    });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.props.onKeyUp(event.target.value, this.state.selected);
  }

  render() {
    let options = [];
    options.push("Title");
    options.push("Actor");
    options.push("Director");
    let rows = [];
    options.map((row, index) => {
      if (row === this.state.selected) {
        rows.push(<button key={index} type="button" className="btn btn-primary" onClick={this.handleChangeFilterType}>{row}</button>)
      } else {
        rows.push(<button key={index} type="button" className="btn btn-outline-info waves-effect" onClick={this.handleChangeFilterType}>{row}</button>)
      }
    });
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-lg-offset-1">
              <form className="form-inline">
                <div className="md-form input-group">
                  <div className="customWidth md-group form-group">
                    <input type="text" className="customWidth form-control" placeholder={this.state.hint} onChange={this.handleChange} />
                  </div>
                </div>
                {rows}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
