import React from 'react';
import AddItemModal from '../components/ItemSubmissionModal';

class UserInfo extends React.Component {

  constructor(props){
    super(props)
    this.state={
      showModal:false,
    }
    this.toggleModal = this.handleSelect.bind(this)
    this.submit = this.handleSubmission.bind(this)
  }
  
  handleSelect(){
    this.setState({
      showModal: this.state.showModal ? false : true
    })
  }

  handleSubmission(name,category,quant,initPrice,currPrice,date,desc,pub){
    
    let jsonToSend= {
      name:name,
      category:category,
      quantity:quant,
      dateAdded: date,
      purchasePrice: initPrice,
      currentPrice: currPrice,
      description: desc,
      pub: pub
    }
   
    fetch("/api/inv/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonToSend),
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }
  
        throw new Error('Content validation');
      })
      .then(post => {
        alert("Success!")
        this.props.refreshPage();
        this.setState({
          showModal:false
        })
       
      })
      .catch(err => {
        alert("error :3")
      });
      
  }
    render () {
   
     
    return (
      <div style={{padding:"10px", }}>
        <div className="card" style={{background: "white",}}>
          <img className="card-img-top" src={this.props.list.imageURL} alt="userImage.jpg"></img>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"> {this.props.list.userName } </li>
            <li className="list-group-item"> {this.props.list.userEmail} </li> 
          </ul>
          <div className="card-body">
            <p>badges</p>
    
            <AddItemModal reloadContent={this.props.reloadContent} edit={false}show={this.state.showModal} hide= {this.toggleModal} submission={this.submit}></AddItemModal>
            <button onClick={this.toggleModal} className="btn btn-info">Add Item</button>
          </div>
        </div>
      </div>
      );
    }
}



export default UserInfo;