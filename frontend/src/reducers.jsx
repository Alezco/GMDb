

const Reducer = function(state, action) {
  console.log("reducer call");
  if (state == undefined) {
    state = { };
  }
  return state;
}
export default Reducer;
