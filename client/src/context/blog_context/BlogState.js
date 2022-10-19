import { createContext, useReducer } from "react"
import axios from "axios";
import blogReducer from "./blogReducer";
import * as ActionTypes from "../ContextActions"

export const BlogContext = createContext();

export default function BlogState(props) {
    const initialState = {
        blogs: null,
        currentBlog: null,
        toasts: null,
    }
    const [state, dispatch] = useReducer(blogReducer, initialState);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")
        }
    }

    // #region -------------- [ Actions ] --------------
    const getBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs', config);
            dispatch({
                type: ActionTypes.GET_BLOG_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.BLOGS_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getBlogById = async (blogId) => {
        try {
            const res = await axios.get("/api/blogs/" + blogId, config)
            dispatch({
                type:ActionTypes.GET_BLOG_BY_ID,
                payload:res.data
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.BLOGS_FAIL,
                payload: error.response.data
            })
        }
    }

    const createBlog = async (blogData) => { }

    const updateBlog = async (blogData) => { }

    const deleteBlog = async (blogId) => { }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearBlogs = async () => {
        dispatch({
            type: ActionTypes.CLEAR_BLOGS
        })
    }

    // #endregion

    return (
        <BlogContext.Provider value={{
            blogs: state.blogs,
            currentBlog: state.currentBlog,
            toasts: state.toasts,
            getBlogs,
            getBlogById,
            createBlog,
            updateBlog,
            deleteBlog,
            clearErrors,
            clearBlogs
        }}>
            {props.children}
        </BlogContext.Provider>
    )

}






