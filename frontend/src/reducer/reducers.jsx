const Reducer = function(state, action) {
  if (state == undefined) {
    state = { };
  }
  if (action.type === 'SET_JS_JOKES') {
    return Object.assign({}, state, { jokes: action.jokes });
  }
  if (action.type === 'SET_USER_ID') {
    return Object.assign({}, state, { username: action.username });
  }
  if (action.type === 'SET_USER_OBJECT') {
    let userObj = new Object()
    console.log(action.user);
    Object.assign(userObj, action.user);
    return Object.assign({}, state, { user: userObj });
  }
  if (action.type === 'UPDATE_USER') {
    let userObj = new Object()
    Object.assign(userObj, action.user);
    return Object.assign({}, state, { user: userObj });
  }
  if (action.type === 'ADD_FAVORITES_MOVIE_ID') {
    let newArray;
    if (!state.favorites || state.favorites.info) {
      newArray = []
    } else {
      newArray = state.favorites.slice();
    }
    Object.assign(action.item, { movieID: action.item.id });
    newArray.splice(action.index, 0, action.item);
    return Object.assign({}, state, { favorites: newArray });
  }
  if (action.type === 'REMOVE_FAVORITES_MOVIE_ID') {
    let newArray = state.favorites.slice();
    let searchTerm = action.item.Title;
    let index = -1;
    for(var i = 0, len = newArray.length; i < len; i++) {
      if (newArray[i].Title === searchTerm) {
        index = i;
        break;
      }
    }
    newArray.splice(index, 1);
    return Object.assign({}, state, { favorites: newArray });
  }
  if (action.type === 'INIT_FAVORITES') {
    let newArray = action.favorites
    return Object.assign({}, state, { favorites: newArray });
  }
  return state;
}
export default Reducer;
