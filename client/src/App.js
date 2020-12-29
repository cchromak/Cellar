import React from 'react';
import { 
  BrowserRouter as Router, 
  Redirect,
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';

import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './App.css';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUsPage';
import InventoryGridPage from './pages/InventoryGridPage';
import LoginModal from './components/LoginModal'
import PrivateRoute from './components/PrivateRoute';
import auth from './services/auth'
import AllUsersDisplayPage from './pages/AllUsersDisplayPage';
import PublicGalleryPage from './pages/PublicGalleryPage'
document.body.style = 'background-color: aliceblue';


 class Navigation extends React.Component {
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      auth:false,
    }
    this.toggler = this.toggleModal.bind(this)
    this.setAuthen= this.setAuth.bind(this)
    this.reloadContent= this.reloadContent(this)
  }
  toggleModal(){
     this.setState({
      showModal:this.state.showModal ? false : true
     });
  }
signout(){
  auth.signout();
  this.setAuth(false);
  
}
setAuth(login){
  if(login===true){
  this.setState({
    auth:true
  })
  auth.isAuthenticated=true;
  this.props.auth(true)
  }
  else if (login===false){
    this.setState({
      auth:false
    })
    auth.isAuthenticated=false;
    this.props.auth(false)
  }
  
}
reloadContent(){
 
  this.componentDidMount();
}
componentDidMount(){
  if (!this.state.auth){
    fetch('/api/amILoggedIn/').then((response) => {
      this.setAuth(true);
      }
    )
  }
}
render(){
  let button;
  let inv;
  if(this.state.auth){
     button = <button className="btn nav"  onClick={ e=>this.signout(e)}>Logout</button>
     inv =( <li className="nav-item">
     <NavLink className="nav-link btn nav"  exact to="/yourCollection">
       Your Inventory
     </NavLink>
     </li>)
   }
  else{
    button=   <button className="btn nav" onClick={this.toggler}>Login</button>;
    inv=(<span></span>);
  }
  
  return (<div >
      <LoginModal reloadContent={this.reloadContent} setAuth={this.setAuthen} show={this.state.showModal} hide={this.toggler}></LoginModal>
    <nav className="navbar navbar-expand-sm bg shadow mb-3" style={{background: "#B39BC8"}}>
     
      <Link className="navbar-brand btn nav"  exact to="/landing"><img className="icon" alt="logo.png"style={{maxWidth: "45px", paddingRight: "10px"}} src={require('./image1.png')}></img>Cellar</Link>
      {/* Might change this to the site's name later.*/}
      <ul className="navbar-nav mr-auto">
        {inv}
        <li className="nav-item">
          <NavLink className="nav-link btn nav" style={{marginBottom: "3px"}} exact to="/users">
           Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link btn nav" exact to="/aboutUs">
            About Us
          </NavLink>
        </li>
       
      </ul>
      <ul className="navbar-nav" style={{marginBottom: "3px"}}>
        <li className="nov-item">
          {button}
        </li>
        
      </ul>
    </nav>
    </div>
  );
}

function LoginModal(props){
  console.log(props.toggleModal)
  return(<Modal show={props.show} onHide={props.hide}>
    <Modal.Header closeButton>
      <Modal.Title>Modal title</Modal.Title>
    </Modal.Header>
  
    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>
  
    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal>
  );
}

}



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      login:false,
    }
    this.comp= this.setLogin.bind(this)
  }
  setLogin(tf){
    if (tf===true){
   
      this.setState({
        login:true,
      })

    }
    else if(tf===false){
     
      this.setState({
        login:false,
      })
     
    }
  }
  render() {
    return (
      <div>
        <Router>

          <Navigation toggler={this.toggleModal}/>
         

          <Navigation  auth={this.comp}/>

          <div className="container-fluid text-center">
         
            <div className="row justify-content-center">
            <LoginModal show={this.state.showModal} hide= {this.toggleModal}></LoginModal>
              <Switch>
                <Route path="/landing" render={props => ( <LandingPage {...props} login={this.state.login} /> )}/>
                <Route path="/aboutUs" component={AboutUsPage} />
                <PrivateRoute path="/yourCollection" component={InventoryGridPage}/>
                <Route path="/users" render={props => ( <AllUsersDisplayPage {...props} login={this.state.login} /> )}/>
                <Route path="/userGallery/" component={PublicGalleryPage}/>
                <Route exact path="/">
                 <Redirect to="/landing" />
               </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;