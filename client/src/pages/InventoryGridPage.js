import React from 'react';
import UserInfo from '../components/UserInfo';
import ItemListBox from '../components/ItemListBox';
import Loading from '../components/Loading'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
class InventoryGridPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      itemsList:'',
      userList: '',
    }
    this.refreshPage = this.refreshPage.bind(this)
  }
  
 refreshPage(){
   this.componentDidMount()
  
 }
  componentDidMount() {
    Promise.all([fetch("/api/inv/"), fetch('/api/loggedInUser/')])
      .then(([inv, user]) => { return Promise.all([inv.json(), user.json()]) })
      .then(([inv, user]) => {
        this.setState({itemsList: inv, userList: user})
 
      })
      .catch(err => {
        console.log("error")
      });
}


  
    render(){
      let renderedContent
      if(!this.state.itemsList.length && !this.state.userList.length){
        renderedContent= (<span><Loading/></span>)
      }
      else if (this.state.itemsList.length ===0){
        renderedContent=  (  
          <div>
          <Container>
            <Row>
              <Col sm={4}>
              <div style={{textAlign:"center"}}>
        <h1 style={{wordWrap:"break-word"}}>Welcome, {this.state.userList[0].userName}</h1> 
        <UserInfo reloadContent ={this.refreshPage} list={ this.state.userList[0] }/>
        </div>
              </Col>
            </Row>
          </Container>
         
      </div>
      )
      }
      else {
        renderedContent=  (  
        <Container>
        <Row>
        <Col sm={4}>
        <div style={{textAlign:"center"}}>
        <h2 style={{wordWrap:"break-word"}}>Welcome, {this.state.userList[0].userName}</h2> 
        <UserInfo reloadContent ={this.refreshPage} list={ this.state.userList[0] }/>
        </div>
        </Col>
        <Col sm={8}>
        
        <ItemListBox reloadContent={this.refreshPage} list={this.state.itemsList} user={this.state.userList} refreshPage ={this.refreshPage}/>
        
        </Col>
        </Row>
        </Container>
    )
    
      }
  
    
    
  
  return (
    <div style={{padding: "50px"}}>
      { renderedContent }
    </div>
  );
  }
}

export default InventoryGridPage;