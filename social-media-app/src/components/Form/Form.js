import React,{useEffect, useState} from 'react'
import useStyles from "./styles"
import {TextField, Typography,Paper,Button} from "@material-ui/core"
import Filebase from "react-file-base64";
import {useDispatch,useSelector} from "react-redux"
import { createPost, updatePost } from '../../actions/posts';
import {useLocation} from "react-router-dom"

const Form = ({currentId,setCurrentId}) => {
  const location=useLocation();
  const post=useSelector((store)=>currentId?store.posts.find(post=>post._id===currentId):null);
const user=JSON.parse(localStorage.getItem("profile"));
  
  

  const [postData,setPostData]=useState({
    title:"",
    message:"",
    selectedFile:"",
    tags:""

  })
  const dispatch=useDispatch();

  const classes=useStyles();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(currentId) {
      console.log("edit")
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
      clear();
    }else{
      dispatch(createPost({...postData,name:user?.result?.name}))
      clear();
    }

    

  }


useEffect(()=>{
  if(post) {
    setPostData(post);
  }
},[post,location])
 


  const clear=()=>{
      setCurrentId(null);
      setPostData(
        {
        title:"",
        message:"",
        selectedFile:"",
        tags:""
      }
      )
  }

  if(!user?.result) {
    return <Paper className={classes.paper}>
      <Typography variant="h6" align='center'>Please sign in to create your own memories and like other's memories</Typography>
    </Paper>
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='false' className={`${classes.root} ${classes.form}`} noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
         {currentId? "Editing":"Creating"} a Memory
        </Typography>
        <TextField label="title" value={postData.title} onChange={e=>setPostData({...postData,title:e.target.value})} />
        <TextField label="message" value={postData.message} onChange={e=>setPostData({...postData,message:e.target.value})} />
        <TextField label="tags" value={postData.tags} onChange={e=>setPostData({...postData,tags:e.target.value.split(",")})} />
        <Filebase type="file" multiples="false" onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
        <Button className={classes.buttonSubmit} type="submit" size="large" color="secondary" variant="contained" fullWidth>Submit</Button>
        <Button color="secondary" size="small" onClick={clear}>clear</Button>
      </form>
    </Paper>
  )
}

export default Form;
