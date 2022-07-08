
import * as api from "../api";
import {FETCH_ALL,UPDATE,CREATE,DELETE} from "../constants/actionTypes"


export const fetchPosts=()=>async(dispatch)=>{
        try {
        const {data}=await api.fetchPosts();
         dispatch({type:FETCH_ALL,payload:data})
        }
        catch(err) {
        console.log(err.message);
        }
        
        
}

export const fetchPostBySearch=(searchData)=>async(dispatch)=>{
        try {
        const {data:{data}}=await api.fetchPostBySearch(searchData)
        console.log(data)
        dispatch()
        }catch(err) {
                console.log(err);
        }
}


export const createPost=(newPost)=>async(dispatch)=>{
        try {
        const {data}=await api.createPost(newPost);
        dispatch({type:CREATE,payload:data})
        }catch(err) {
        console.log(err.message);
        }    
        
}

export const updatePost=(id,updatedPost)=>async(dispatch)=>{
        try {
            const {data}=await api.updatePost(id,updatedPost);
            dispatch({type:UPDATE,payload:data})
        }catch(err) {
                console.log(err.message);
        }
}

export const deletePost=(id)=>async(dispatch)=>{
        try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id})
        }catch(err) {
        console.log(err.message);
        }
}

export const likePost=(id)=>async(dispatch)=>{
        try {
        const {data}=await api.likePost(id);
        console.log(data);
        dispatch({type:UPDATE,payload:data})
        }catch(err) {
        console.log(err);
        }
}




