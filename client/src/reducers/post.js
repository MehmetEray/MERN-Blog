import * as types from "../actions/types.";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      };
      default:
          return{
              ...state
          };
  }
};

export default postReducer;