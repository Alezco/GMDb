

exports.SignIn = (login, password, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText));
    } else {
      back(req.responseText, null);
    }
  }
  req.open('POST', 'http://localhost:4242/api/logIn', true);
  req.setRequestHeader("Content-Type", "application/json");
  let jsonToSend = JSON.stringify({"login": login, "pwd": password});
  req.send(jsonToSend);
}


exports.UserFavorites = (userID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 403) {
      back("/login", null);
      this.props.router.push('/login');
    } else {
      back(null, JSON.parse(req.responseText));
    }
  }
  req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
  req.send(null);
}

exports.SignUp = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, 'Successfully registered!');
    }
    else {
      back(req.responseText, null);
    }
  }
  req.open('POST', 'http://localhost:4242/api/signIn', true);
  req.setRequestHeader("Content-Type", "application/json");
  let jsonToSend = JSON.stringify({"login": login, "pwd": password});
  req.send(jsonToSend);
}


exports.LogOut = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, -1)
    } else {
      back('Something went wrong', null);
    }
  }
  req.open('POST', 'http://localhost:4242/api/logOut', true);
  req.send(null);
}

exports.GetSession = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 200) {
      back(null, JSON.parse(req.responseText));
    } else {
      back(-1, null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/session', true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(null);
}
