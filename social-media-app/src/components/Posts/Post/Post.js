import React,{useEffect} from 'react'
import useStyles from "./styles"
import {Card,CardMedia,CardActions, Typography,Button, CardContent} from "@material-ui/core";
import moment from "moment";
import {MoreHoriz,ThumbUp,Delete, ThumbUpAltOutlined, PostAddSharp, ThumbUpOutlined} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import {deletePost,likePost} from "../../../actions/posts"
import {useLocation} from "react-router-dom"




const Post = ({post,setCurrentId}) => {
  console.log("location")
  const location=useLocation();
let user=JSON.parse(localStorage.getItem("profile"))
  const dispatch=useDispatch();
  const classes=useStyles();


  useEffect(()=>{
    user=JSON.parse(localStorage.getItem("profile"))
  },[location])


  const Likes = () => {
    if(post.likes.length>0) {
      return post.likes.find(like=>like===user?.result?._id||user?.result?.sub)?
      (
        <>
        <ThumbUp/> {post.likes.length>2 ? `You and ${post.likes.length-1} other `:`${post.likes.length}  like${post.likes.length>1?"s":""}`}
        </>
      ):
      (
        <>
        <ThumbUpAltOutlined/> {post.likes.length} {post.likes.length>1? "Likes":"Like"}
        </>
        
      )
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };



  return (
    
   <Card className={classes.card}>
    <CardMedia style={{height:300}} image={post.selectedFile} title={post.title}/>
    <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    <div className={classes.overlay2}>
      <Button style={{color:"white"}} onClick={()=>{setCurrentId(post._id)}}>
          <MoreHoriz fontSize='medium'/>
      </Button>
    </div>
    <div className={classes.details}>{post.tags.map(tag=>`#${tag}`)}</div>
    <CardContent>
    <Typography className={classes.title} variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    <Typography variant="h6">{post.title}</Typography>
      </CardContent>
    <CardActions className={classes.cardActions}>
      <Button disabled={!user?.result} color="primary" size="small" onClick={()=>dispatch(likePost(post._id))}>
        <Likes/>
      </Button>
      <Button color="primary" size="small" onClick={()=>dispatch(deletePost(post._id))}>
        <Delete/>
      </Button>
    </CardActions>
   </Card>
  )
}

export default Post;
