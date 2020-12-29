import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink,
  generatePath
} from 'react-router-dom';

class UserInfoPublic extends React.Component {
   

    render () {
       return (
         <div style={{minWidth: "225px", maxWidth:"225px", padding: "15px"}}>
           <div className="card" >
             <Link to={{pathname:'/userGallery/',state: { params: {id1: this.props.list.userName, id2: this.props.list.userEmail} }}} className="btn btn-lite"><img style={{width:"100%",height:"100%", padding:"0px", margin:"0px",}}  className="card-img-top" src={this.props.list.imageURL} alt="userImage.jpg"></img></Link>
             <div className="card-footer small text-muted text-right">
               <h5> {this.props.list.userName }</h5>
            </div> 
           </div>
         </div>
         );
       }
}

export default UserInfoPublic;