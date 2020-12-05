import React, { Children } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import AboutUsPage from './pages/AboutUsPage';
import InventoryPage from './pages/InventoryPage';
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
      auth:false
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
  console.log("setAuth")
  if(login===true){
  this.setState({
    auth:true
  })
  auth.isAuthenticated=true;
  this.props.auth(true)
  console.log(this.state.auth)
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
  console.log(auth.isAuthenticated)
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
     <NavLink className="nav-link btn nav"  exact to="/inventoryGridPage">
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
     
      <Link className="navbar-brand btn nav"  exact to="/landing">Home </Link>
      {/* Might change this to the site's name later.*/}
      <ul className="navbar-nav mr-auto">
        {inv}
        <li className="nav-item">
          <NavLink className="nav-link btn nav"  exact to="/displayUsers">
           Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link btn nav" exact to="/aboutUs">
            About Us
          </NavLink>
        </li>
       
      </ul>
      <ul className="navbar-nav">
        <li className="nov-item">
          {button}
        </li>
      </ul>
    </nav>
    </div>
  );
}
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      login:"",
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
          <Navigation  auth={this.comp}/>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/landing" render={props => ( <LandingPage {...props} key={this.state.login} login={this.state.login} /> )}/>
                <Route path="/yourCollection" component={InventoryPage}/>
                <Route path="/aboutUs" component={AboutUsPage} />
                <PrivateRoute path="/inventoryGridPage" component={InventoryGridPage}/>
                <Route path="/displayUsers" render={props => ( <AllUsersDisplayPage {...props} login={this.state.login} /> )}/>
                <Route path="/userGallery/" component={PublicGalleryPage}/>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
