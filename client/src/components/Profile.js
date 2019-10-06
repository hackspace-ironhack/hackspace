import React, {Component} from 'react';
import { Redirect, Link } from "react-router-dom";

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      user: "",
      redirectToSignin:false
    }
  }
  // added to stop the error
  isAuthenticated = () => {
    return {};
  }
read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`

    }
  })
  .then(response =>{
    return response.json()
  })
};

  init = (userId)=>{  //makes the request to backend and gives userid 
   const token = this.isAuthenticated().token; //added this to stop the error
    this.read(userId, token)
    .then(data => {
       if(data.error){
        this.setState({redirectToSignin:true});
       }else {
         this.setState({user:data});
       }
    });

  }
  componentDidMount(){  // when the component is mounted get the user id
    const userId = this.props.match.params.userId
    this.init(userId);
  }

 render (){
   return (
     <div>
     <div clasName>
       <h2>Profile</h2>
       <p>Hello (this.isAuthenticated().user.name)</p> 
       <p>Email: (this.isAuthenticated().user.email)</p>
     </div>
    {/* only after login user can see delete profile and edit profile */}
     <div> 
       {this.isAuthenticated().user &&
         this.isAuthenticated().user._id == 
         this.state.user._id && (
           <div> 
             <Link to = {`user/edit/${this.state.user._id}`}>
               Edit Profile
             </Link>
             <button> Delete </button>
           </div>
         )}
     </div>
     </div>
   );
 }
}
export default Profile;

