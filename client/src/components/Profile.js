import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";
import About from "./About";
import UploadImage from "./UploadImage";
import AddPost from "./AddPost";
import Likebutton from "./Likebutton";
import axios from "axios";
import ToDoList from "./ToDoList";



export default class Profile extends Component{

   state = {
     profile: {}
   };

   componentDidMount = () => {
     this.getData();
   };

   getData = () => {
   axios.get(`/api/about/${this.props.user._id}`).then(response => { 
    console.log("response : ", response.data)
    this.setState({
       profile:response.data
     });
   }).catch(err =>{
     console.log(err);
   });
 };

 render (){
   return (
     <div>

       hobbies {this.state.profile.hobbies}
       {/* <About getData={this.getData}/> */}
       {/* <UploadImage/> */}
       {/* <AddPost/> 
       <Likebutton/>
       <ToDoList/> */}
     </div>
   );    
      
}
}

