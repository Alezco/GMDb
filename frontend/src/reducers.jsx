

const Reducer = function(state, action) {
  console.log("reducer call");
  if (state == undefined) {
    state = { };
  }
  if (action.type === 'SET_USER_ID') {
      console.log("reducer ok");
      console.log(action.username);
      return Object.assign({}, state, { username: action.username });
  }
  console.log(state);
  return state;
}
export default Reducer;
