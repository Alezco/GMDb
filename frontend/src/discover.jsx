import React, { Component } from 'react';
import {render} from 'react-dom';
import DiscoverItem from './discoveritem.jsx'
import NavBar from './navBar.jsx';


class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users : null,
      showDetail : false,
      detailID : -1
    }
  }

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          console.log(JSON.parse(req.responseText));
          self.setState({
            users : JSON.parse(req.responseText),
            showDetail : self.state.showDetail,
            detailID : self.state.detailID
          });
        }
      }
      req.open('GET', 'http://localhost:4242/api/users', true);
      req.send(null);
  }

  showDetailIndex(idDetail) {
    self.setState({
      users : JSON.parse(req.responseText),
      showDetail : true,
      detailID : idDetail
    });
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
      </div>
      );
  }
}

export default Discover;
