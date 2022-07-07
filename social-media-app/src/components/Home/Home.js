import React,{useState,useEffect} from 'react';
import {Grow,Container,Grid} from "@material-ui/core";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../actions/posts';
import useStyles from "./styles"


const Home = () => {
    const classes=useStyles();
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchPosts())
      },[dispatch])
  return (
    <div>
      <Grow in>
      <Container >
        <Grid className={classes.container} container justifyContent='space-between' alignItems='stretch' spacing={2}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
          </Grid>
        </Grid>
      </Container>
     </Grow>
    </div>
  )
}

export default Home
