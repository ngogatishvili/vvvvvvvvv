import React from 'react'
import Post from './Post/Post'
import useStyles from "./styles";
import { useSelector } from 'react-redux';
import {CircularProgress,Grid} from "@material-ui/core"

const Posts = ({setCurrentId}) => {
  console.log("render")
  const posts=useSelector((store)=>store.posts)
  const classes=useStyles();

  console.log(posts);
  return (
    <>
    {!posts.length ? <CircularProgress/>: 
    
    <Grid container className={classes.mainContainer} alignItems="center" justifyContent='center' spacing={3} >
      {posts.map(post=>(
        <Grid key={post._id}  item xs={4} >
          <Post  post={post} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
      </Grid>}
      <h1>POSTS</h1>
      
      
      
    </>
  )
}

export default Posts
