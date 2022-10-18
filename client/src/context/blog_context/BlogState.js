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
        header: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token");
        }
    }

    // #region -------------- [ Actions ] --------------
    const getBlogs = async () => { }

    const getBlogById = async (blogId) => { }

    const createBlog = async (blogData) => { }

    const updateBlog = async (blogData) => { }

    const deleteBlog = async (blogId) => { }

    const clearErrors = async () => { }

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
        }}>
            {props.children}
        </BlogContext.Provider>
    )

}






