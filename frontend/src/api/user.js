exports.getUsers = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText));
    } else {
      back('something went wrong', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/users', true);
  req.send(null);
}

exports.updateUrl = (url, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  let user = this.props.user;
  user.url = this.state.url;
  req.onload = () => {
    if (req.status == 200) {
      back(null, url);
    } else {
      back('somethnig went wrong', null)
    }
  }
  req.open('POST', 'http://localhost:4242/api/updateURL', true);
  req.setRequestHeader("Content-Type", "application/json");
  let jsonToSend = JSON.stringify({"url": url});
  req.send(jsonToSend);
}

exports.getFavoritesOfUser = (userID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      let res = JSON.parse(req.responseText);
      if (res.info) {
        back(null, null);
      } else {
        back(null, JSON.parse(req.responseText));
      }
    } else {
      back('./login', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
  req.send(null);
}

exports.getUserByID = (userID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText)[0]);
    } else {
      back('./login', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/user/'+userID, true);
  req.send(null);
}
