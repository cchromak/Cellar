import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import auth from '../services/auth'
class LoginModal extends React.Component{
    constructor(props){
         super(props)
         this.state={
          activeTab:0,
          username:"",
          email:"",
          passWord:"",
          image:"",
        }

    }
    login = (e) => {
       
        let { email, password } = this.state;
        auth.authenticate(email, password)
          .then((user) => {
            this.setState({ redirectToReferrer: true });
           
           this.props.setAuth(true);
           this.props.hide();
            
          
          })
          .catch((err) => {
           // this.setState({ failed: true });
          });
        
      }
      signup=(e)=>{
        let{username,email,password} =this.state;
       
        auth.signin(this.state.image[0],username, email, password)
        .then((user) => {
         
         this.props.setAuth(true);
         this.props.hide();
         
        })
        .catch((err) => {
               alert(err)
        });
     
      }
    render(){
        let renderThis
        if (this.state.activeTab===0){
          renderThis=(<div>
          <Modal.Header closeButton>
            <Modal.Title >Login</Modal.Title>
         </Modal.Header>
          <Modal.Body>
          <div className="container">
            <form>
              Email Address:
              <br/>
              <input type="text" onChange={e=>this.setState({email:e.target.value})} />
              <br/>
             
              Password:
              <br/>
              <input type="password" onChange={e=>this.setState({password:e.target.value})}/>
              <br/>
             <Row className= "align-items-center" ><Col><p>Don't have an account?</p></Col> <Col><Button  variant="link" onClick={e=>{this.setState({activeTab:1})}}>sign up</Button></Col> </Row>
            </form>
            </div>
          </Modal.Body>
        
          <Modal.Footer>
           
            <Button variant="info" size="lg" block  onClick={e=>this.login()} >Login</Button>
          </Modal.Footer>
          </div>
        )
        }
      else if (this.state.activeTab===1){
       
        renderThis=(
        <div>
           <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          
          </Modal.Header>
          
          <Modal.Body>
            <form>
              Username:
              <br/>
              <input type="text" value={this.state.username} onChange={e=>this.setState({username:e.target.value})} />
              <br/>

              Email Address:
              <br/>
              <input type="text" value={this.state.email} onChange={e=>this.setState({email:e.target.value})} />
              <br/>
             
              Password:
              <br/>
              <input type="password" onChange={e=>this.setState({password:e.target.value})}/>
              <br/>
              Profile Image:
              <br/>
              <input type="file" name="files" onChange={e=>{this.setState({image:e.target.files})}} ></input>
              <br/>
              <p>Back to </p>   <Button variant="link" onClick={e=>{this.setState({activeTab:0})}}>login</Button>
            </form>
         </Modal.Body>
         <Modal.Footer>
         <Button variant="info" size="lg" block  onClick={e=>this.signup()} >Sign up</Button>
       </Modal.Footer>
       </div>)
      }
    return( 
      <Modal show={this.props.show} onHide={this.props.hide}>
         
          {renderThis}
      </Modal>
      
     
    );}
  }
  export default LoginModal;