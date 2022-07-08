import React,{useState,useEffect} from 'react';
import {Grow,Container,Grid, Paper,AppBar,TextField,Button} from "@material-ui/core";
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import { fetchPostBySearch, fetchPosts } from '../../actions/posts';
import useStyles from "./styles"
import Pagination from "../Pagination/Pagination"
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from "material-ui-chip-input"


const  useQuery=()=>{
  return new URLSearchParams(useLocation().search)
}


const Home = () => {
  const navigate=useNavigate();
  

const location=useLocation()
    const [search,setSearch]=useState("");
    const [tags,setTags]=useState([])
    const classes=useStyles();
    const [currentId,setCurrentId]=useState(null);
    const dispatch=useDispatch();
    const query=useQuery();
    const page=query.get("page")||1;
    const searchQuery=query.get("searchQuery");
    useEffect(()=>{
      dispatch(fetchPosts())
      if(location.pathname==="/") {
        return navigate("/posts")
      }
      
        
      },[dispatch])

      const handleKeyPress=e=>{
        if(e.keyCode===13) {
          // search
          searchPost()
        }
      }

      const handleAdd=(tag)=>{
          setTags([...tags,tag])
      }

      const handleDelete=(tagToDelete)=>{
          setTags(tags.filter(tag=>tag!==tagToDelete))
      }

      const searchPost=()=>{
        if(search.trim()||tags.length>0) {
            dispatch(fetchPostBySearch({search,tags:tags.join(",")}));
            navigate(`/posts/search?searchQuery=${search||"none"}&tags=${tags.join(",")}`)
        }
      }
  return (
    <div>
      <Grow in>
      <Container maxWidth="xl" >
        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={2}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar position="static" color="inherit" className={classes.appBarSearch}>
              <TextField
              name="search"
              variant="outlined"
              label="search memories"
              fullWidth
              value={search}
              onKeyDown={handleKeyPress}
              onChange={(e)=>setSearch(e.target.value)}
              />
              <ChipInput
              style={{margin:"10px 0"}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="search tags"
              variant="outlined"
              />
              <Button variant="contained" onClick={searchPost} color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            <Paper>
              <Pagination/>
            </Paper>
            
          </Grid>
        </Grid>
      </Container>
     </Grow>
    </div>
  )
}

export default Home
