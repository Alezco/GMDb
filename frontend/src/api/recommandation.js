



exports.getRecommandation = (userID, back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onload = () => {
    if (req.status == 403) {
      back('/login', null);
    } else {
      back(null, JSON.parse(req.responseText));
    }
  }
  req.open('GET', 'http://localhost:4242/api/recommandation/'+userID, true);
  req.send(null);
}
