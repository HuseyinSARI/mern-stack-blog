import { createContext, useReducer } from "react";
import axios from "axios";
import authReducer from "./AuthReducer";
import * as ActionTypes from "../ContextActions";

export const AuthContext = createContext();

export default function AuthState(props) {

    const initialState = {
        token: localStorage.getItem("token"),
        currentUser: null,
        toasts: null,
        isAuthenticated:null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
        }
    }

// #region ------------------- [ Actions ] -------------------
    const registerUser = async (userData) => {
        try {
            const res = await axios.post("/api/users/register", userData, config)
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: res.data,
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.REGISTER_FAIL,
                payload: error.response.data,
            })
        }
    }

    const loginUser = async (userData) => {
        try {
            const res = await axios.post("/api/users/login", userData, config)
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: res.data,
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.LOGIN_FAIL,
                payload: error.response.data,
            })
        }
    }

    const logoutUser = async () => {
        dispatch({
            type: ActionTypes.LOGOUT,
        })
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const getProfile = async () => {
        try {
            const res = await axios.get("/api/users/profile",config);
            dispatch({
                type: ActionTypes.SET_CURRENT_USER,
                payload: res.data,
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: ActionTypes.AUTH_ERROR,
                payload: error.response.data,
            })
        }
    }


// #endregion -----------------------------------------------

    return (
        <AuthContext.Provider value={{
            token: state.token,
            currentUser: state.currentUser,
            toasts: state.toasts,
            isAuthenticated: state.isAuthenticated,
            registerUser,
            loginUser,
            logoutUser,
            clearErrors,
            getProfile
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}