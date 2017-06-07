

exports.GetFilms = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null,  JSON.parse(req.responseText));
    } else {
      back('somethig went wrong', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/films', true);
  req.send(null);
}


exports.LikeAction = (movieID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText));
    } else {
      back('Something went wrong', null);
    }
  }
  req.open('POST', 'http://localhost:4242/api/like', true);
  req.setRequestHeader("Content-Type", "application/json");
  let jsonToSend = JSON.stringify({"movieID": movieID});
  req.send(jsonToSend);
}

exports.GetMovieDetail = (movieID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText));
    }
    else {
      back('./login', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/movie/'+movieID, true);
  req.send(null);
}
