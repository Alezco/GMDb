

exports.GetFilms = (back) => {
  let req = new XMLHttpRequest();
  req.withCredentials = true;
  req.onLoad = () => {
    if (req.status == 200) {
      back(null,  JSON.parse(req.responseText));
    } else {
      back('somethig went wrong', null);
    }
  }
  req.open('GET', 'http://localhost:4242/api/films', true);
  req.send(null);
}
