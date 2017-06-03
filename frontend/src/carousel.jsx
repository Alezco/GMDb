import React, { Component } from 'react';
import {render} from 'react-dom';
import CarouselItem from './carouselitem.jsx';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies : null,
      count : 0,
      offset : 0
    }
}

componentWillMount() {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  let self = this;
  req.onreadystatechange = function() {
      if (req.status == 403) {
        console.log("Not Authorized");
        self.props.router.push('/login');
      }
      else {
            console.log("Authorized");
            if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
              let NewMovies = JSON.parse(req.responseText);
              self.setState({
                movies : NewMovies,
                count : NewMovies.list.length,
                offset : self.state.offset
              });
          }
     }
  }
  req.open('GET', 'http://localhost:4242/api/recommandation/'+this.props.username, true);
  req.send(null);
}

  render() {
    console.log("recommanded movies");
    console.log(this.state.movies);
    if (!this.state.movies) {
      return(<div></div>);
    }
    let rows = [];
    let count = 0;
    this.state.movies.list.map((row, index) => {
      if (index > this.state.offset && count < 3) {
        count++;
        rows.push(<CarouselItem key={row.id} index={index} movieObject={row}/>)
      }
    });
    return(
      <div className="container">
    <div className="col-md-12">
         <p>{this.state.movies.field}</p>
        <div className="well">
            <div id="myCarousel" className="carousel slide">
                <div className="carousel-inner">
                    <div className="item active">
                        <div className="row">
                            {rows}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
      );
  }
}
export default Carousel;
