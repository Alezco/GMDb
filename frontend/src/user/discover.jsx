import React, { Component } from 'react';
import {render} from 'react-dom';
import DiscoverItem from './discoveritem.jsx'
import NavBar from '../global/navBar.jsx';
import Footer from '../global/footer.jsx';
const api = require('../api/user.js');

class Discover extends Component {
  constructor(props) {
    super(props);

    this.getUsersResponse = this.getUsersResponse.bind(this);

    this.state = {
      users : null,
      showDetail : false,
      detailID : -1
    }
  }

getUsersResponse(err, res) {
  if (err) {
    console.log(err);
  } else {
    this.setState({
      users : res,
      showDetail : this.state.showDetail,
      detailID : this.state.detailID
    });
  }
}
  componentWillMount() {
    api.getUsers(this.getUsersResponse);
  }

  render() {
    if (!this.state.users) {
      return (<div></div>);
    }
    let rows = [];
    this.state.users.map((row, index) => {
      rows.push(<DiscoverItem key={row.id} index={index} userObject={row}/>)
    });
    return(
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-header">
                <h1>Good movies database</h1>
              </div>
            </div>
          </div>
          {rows}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Discover;
