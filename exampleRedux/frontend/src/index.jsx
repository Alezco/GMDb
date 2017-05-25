/*let imagesDom = {};
let cursor = 0;
let lock = 0;
let amount = 30;

function deleteImage(imageIndex) {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("DELETE", '/api/pictures/'+imageIndex.id);
  imageIndex.outerHTML = "";
  imagesDom[''+imageIndex.id].outerHTML = "";
  xmlhttp.send();
}

function LoadDB() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", '/api/pictures/db');
  xmlhttp.send(null);
  location.reload();
}

function LoadJSON() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", '/api/pictures/json');
  xmlhttp.send(null);
  location.reload();
}

function sendImage() {
  let urlimage = document.getElementById("urlcontent");
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
  xmlhttp.open("POST", '/api/pictures');
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify({picture:""+urlimage.value}));
  urlimage.value = ""
  location.reload();
}

 function fetch() {
   console.log("fetch");
   let xhr = new XMLHttpRequest()
   xhr.open('GET', '/api/pictures?cursor='+cursor+'&amount='+amount, true);
   xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let plop = JSON.parse(xhr.responseText);
          for (let i = 0; i < plop.length; i++) {
            let cell = document.createElement("div");
            cell.setAttribute("class", "MyImage");
            cell.id = plop[i].index;
            document.body.appendChild(cell);

            let p = document.createElement("img");
            p.setAttribute("class", "theImage");
            cell.appendChild(p);

            p.onload = function(){
                    this.onload = function() {
                       return;
                    };
                 if (plop[i].picture.includes("lorempixel")){
                   p.src = plop[i].picture+"?t="+Date.now();
                 } else {
                   p.src = plop[i].picture;
                 }
            };
            p.src = "placeholder.png";

            imagesDom[''+plop[i].index] = cell;

            //BONUS
           let modal = document.getElementById('myModal');
           let img = p;
           let modalImg = document.getElementById('img01');
           let captionText = document.getElementById("caption");
           img.onclick = function(){
               modal.style.display = "block";
               modalImg.src = this.src;
               captionText.innerHTML = this.alt;
           }
           let span = document.getElementsByClassName("close")[0];
           span.onclick = function() {
               modal.style.display = "none";
           }
           //END BONUS

            let b = document.createElement("button");
            b.setAttribute("class", "myButton");

            b.innerHTML = 'X';
            b.onclick = (function (e) {
                 e = e || window.event;
                 deleteImage(e.currentTarget.parentElement);
             });
            cell.appendChild(b);

          }
          cursor = cursor + amount;
          lock = 0;
        } else {
          if (xhr.status == 404) {
            lock = 0;
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

 window.onscroll = function(ev) {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       if (lock === 0) {
         lock = 1;
         fetch();
       }
     }
 };

 let upload = document.getElementById("sendMyImage");
 upload.addEventListener("click", sendImage, false);

 let loadDB = document.getElementById("loadFromDB");
 loadDB.addEventListener("click", LoadDB, false);

 let loadJSON = document.getElementById("loadFromJSON");
 loadJSON.addEventListener("click", LoadJSON, false);

 fetch();*/
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './app.jsx';
import css from './style.css';
import imageReducer from './reducers.jsx';

let store = createStore(imageReducer);

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
