import * as types from "./types.";
import * as api from "../api/index";

export const fetchPosts = () => {
    return {
        type: types.FETCH_POSTS,
        payload: [],
    };
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({
            type: types.CREATE_POST,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};
