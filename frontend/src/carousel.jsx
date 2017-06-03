import React, { Component } from 'react';
import {render} from 'react-dom';
import CarouselItem from './carouselitem.jsx';
import Slider from 'react-slick';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.rightClick = this.moveRight.bind(this)
    this.leftClick = this.moveLeft.bind(this)


    this.state = {
      movies : null,
      active: 2,
      direction: ''
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
                active: self.state.active,
                direction: self.state.direction
              });
          }
     }
  }
  req.open('GET', 'http://localhost:4242/api/recommandation/'+this.props.username, true);
  req.send(null);
}


moveLeft() {
        let newActive = this.state.active
        newActive--
        this.setState({
            movies : this.state.movies,
            active: newActive < 0 ? this.state.movies.list.length - 1 : newActive,
            direction: 'left'
        })
    }

    moveRight() {
        let newActive = this.state.active
        this.setState({
            movies : this.state.movies,
            active: (newActive + 1) % this.state.movies.list.length,
            direction: 'right'
        })
    }

    slickNext() {
      console.log("get next one");
    }

    slickPrev() {
      console.log("get prev one");
    }

    generateItems() {
        var items = []
        var level
        console.log(this.state.active)
        for (var i = this.state.active - 2; i < this.state.active + 3; i++) {
            var index = i
            if (i < 0) {
                index = this.state.movies.list.length + i
            } else if (i >= this.state.movies.list.length) {
                index = i % this.state.movies.list.length
            }
            level = this.state.active - i
            console.log("key");
            console.log(this.state.movies.list[index].id);
            console.log("push");
            items.push(<div key={this.state.movies.list[index].id}><CarouselItem movieObject={this.state.movies.list[index]}/></div>)
            //items.push(<div key={this.state.movies.list[index].id}><img src='http://placekitten.com/g/400/200' /></div>)
        }
        return items
    }

  render() {
    console.log("recommanded movies");
    console.log(this.state.movies);
    if (!this.state.movies) {
      return(<div></div>);
    }
    let rows = [];
    this.state.movies.list.map((row, index) => {
      rows.push(<div key={row.id} style={{'maxWidth': '100px !important'}}><CarouselItem movieObject={row}/></div>)
    });
    let settings = {
            dots: true,
            speed: 500,
            arrows: true,
            autoplay: true,
            slidesToShow: 5
        };
    return(
      <div>
        {this.state.movies.field}
      <Slider {...settings}>
        	{rows}
        </Slider>
      </div>
      );
  }
}
export default Carousel;
