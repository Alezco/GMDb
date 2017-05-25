

const imageReducer = function(state, action) {
  console.log("reducer call");
  if (state == undefined) {
    state = { images : [] };
  }
  if (action.type === 'LOAD_IMAGES_SUCCESS') {
      console.log("reducer ok");
      console.log(action.images);
      return Object.assign({}, state, { images: action.images });
  }
  console.log(state);
  return state;
}
export default imageReducer;
