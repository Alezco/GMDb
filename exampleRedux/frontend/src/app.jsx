
import React, { Component } from 'react';
import {render} from 'react-dom';
import  Header  from './header.jsx';
import  Modal  from './modal.jsx';
import  Controler from './controler.jsx';
import  Image from './image.jsx';
const Redux =require('react-redux');

const LOAD_IMAGES_SUCCESS = 'LOAD_IMAGES_SUCCESS';


class App extends Component {

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.lock = 0;
    this.state = {
      cursor : 0,
      amount : 20,
    };
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetch();
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.lock === 0) {
        this.lock = 1;
        this.fetch();
      }
    }
  }

  fetch() {
      console.log("fetch");
      let tmp = [];
      let xhr = new XMLHttpRequest()
      let self = this;
      xhr.open('GET', 'http://localhost:4242/api/pictures?cursor='+this.state.cursor+'&amount='+this.state.amount, true);
      xhr.onload = function (e) {
         if (xhr.readyState === 4) {
           if (xhr.status === 200) {
             let plop = JSON.parse(xhr.responseText);
             for (let i = 0; i < plop.length; i++) {
               plop[i].picture += '?t='+Math.random()
               tmp.push(plop[i]);
             }
             self.props.dispatch({
                type: LOAD_IMAGES_SUCCESS,
                images: tmp
            });
           } else {
             if (xhr.status == 404) {
               self.setState({
                 cursor : self.state.cursor,
                 amount : self.state.amount
               }, () => { self.lock = 0; } );
               return;
             }
           }
         }
       };

       xhr.onerror = function (e) {
         console.error(xhr.statusText);
       };
      xhr.send(null);
    }

  render() {
    console.log(this.props.images.images);
    console.log(this.props.images.images.length);
    let rows = []
    this.props.images.images.map((row, index) => {
        console.log("in loop");
        rows.push(<Image key={index} index={index} imageObject={row}/>);
    })
    return(
      <div>
            <Header />
            <Controler />
            {rows}
       </div>
      );
  }
}

const mapStateToProps = (state)  => {
  return {
    images: state
  };
}

export default Redux.connect(
  mapStateToProps
  )(App);
