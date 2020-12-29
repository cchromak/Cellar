import React from 'react';
import LandingPageBox from '../components/LandingPageItemBox';



class LandingPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      itemsList:'',
      buttonPressed: '',
      login:false,
    }
    this.topPrice = this.topPrice.bind(this);
    this.recentAdded = this.recentAdded.bind(this);
  }

 topPrice () {
   if (this.state.buttonPressed !== 'topPrice') {
    fetch('/api/topPrice/')
    .then(res => res.json())
    .then(post => {
      this.setState({itemsList:post, buttonPressed: 'topPrice'}) 
  })
  }
 }

 recentAdded () {
  
   if (this.state.buttonPressed !== 'recentAdded') {
    fetch('/api/recentAdded/')
    .then(res => res.json())
    .then(post => { 
    this.setState({itemsList:post, buttonPressed: 'recentAdded'}) 
    })
  }
 }

 componentDidMount() {
 
  this.setState({
    itemsList:'',
  })
  fetch('/api/recentAdded/')
    .then(res => res.json())
    .then(post => {
    this.setState({itemsList:post, buttonPressed: 'recentAdded'}) 
  })
   
}
componentDidUpdate(prevProps) {
 
  if(prevProps.login !== this.props.login) {
  
  this.componentDidMount();
 }
}

  render () {
   
      return (
      
          <div style={{padding: "5px"}}>
            {/* <h1>Cellar Home</h1> */}
            <div className="boxHolder">
            <h4 style={{textAlign:"left"}}>Items Showcase</h4>
            <div className="showcase"style={{border:"solid", borderRadius:"10px",}}>
            <LandingPageBox list={ this.state.itemsList } />
            </div>
            <div style={{padding: "15px"}}>
              <button onClick={(e) => this.topPrice()} className="btn btn-info" style={{margin: "5px"}}>Top Price</button>
              <button onClick={(e) => this.recentAdded()} className="btn btn-info" style={{margin: "5px"}}>Recent Added</button>
            </div>
            </div>
          </div>
      )
  }
}

export default LandingPage;