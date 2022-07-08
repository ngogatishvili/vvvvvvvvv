import axios from "axios"

const API=axios.create({baseURL:"http://localhost:9090"})

API.interceptors.request.use((request)=>{
    if(localStorage.getItem("profile")) {
        request.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }

    return request;
})


export const fetchPosts=()=>API.get("/posts");
export const fetchPostBySearch=(searchData)=>API.get(`/posts/search?searchQuery=${searchData.search||"none"}&tags=${searchData.tags}`)


export const createPost=(newPost)=>API.post("/posts",newPost);
export const updatePost=(id,updatedPost)=>API.patch(`/posts/${id}`,updatedPost);
export const deletePost=(id)=>API.delete(`posts/${id}`);
export const likePost=(id)=>API.patch(`posts/${id}/likePost`);


export const signIn=(formData)=>API.post("/user/signin",formData);
export const signUp=(formData)=>API.post("/user/signup",formData);
















