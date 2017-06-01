const Reducer = function(state, action) {
  console.log("reducer call");
  if (state == undefined) {
    state = { };
  }
  console.log("reducer " + action.type);
  if (action.type === 'SET_USER_ID') {
      console.log(action);
      return Object.assign({}, state, { username: action.username });
  }
  if (action.type === 'ADD_FAVORITES_MOVIE_ID') {
    console.log(action);
    let newArray = state.favorites.slice();
    newArray.splice(action.index, 0, action.item);
    return Object.assign({}, state, { favorites: newArray });
  }
  if (action.type === 'REMOVE_FAVORITES_MOVIE_ID') {
    console.log(action);
    let newArray = state.favorites.slice();
    newArray.splice(action.index, 1);
    return Object.assign({}, state, { favorites: newArray });
  }
  if (action.type === 'INIT_FAVORITES') {
    console.log(action);
    let newArray = action.favorites
    return Object.assign({}, state, { favorites: newArray });
  }
  console.log(state);
  return state;
}
export default Reducer;
