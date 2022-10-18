import { useContext } from "react";
import { AuthContext } from "../context/auth_context/AuthState";
import { BlogContext } from "../context/blog_context/BlogState";

// We define this custom hook for making easy to use context. It provides less code writing for using context.
export function useAuth() {
    return useContext(AuthContext);
}

export function useBlog(){
    return useContext(BlogContext);
}