import React from 'react';
import AddItemModal from '../components/ItemSubmissionModal'


class InventoryPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      showModal:false
    }
    this.toggleModal = this.handleSelect.bind(this)
    this.submit = this.handleSubmission.bind(this)
  }
  handleSelect(){
    this.setState({
      showModal: this.state.showModal ? false : true
    })
  }
  handleSubmission(name,quant,initPrice,currPrice,date,desc){
    
    let jsonToSend= {
      name:name,
      quantity:quant,
      dateAdded: date,
      purchasePrice: initPrice,
      currentPrice: currPrice,
      description: desc,
    }
    console.log(JSON.stringify(jsonToSend))
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
        this.setState({
          showModal:false
        })
      })
      .catch(err => {
        alert(err)
      });
  }
  deleteItem(id){
     fetch("api/inv/"+id,{
       method:'DELETE'
     })
     .then(response=>{if(response.ok){alert(1)}})
     .catch(err=>{alert("error")})
  }
  componentDidMount() {
    fetch("/api/inv/")
      .then(res => res.json())
      .then(post => {
       alert(post.length)
       console.log(post)
      })
    }


  render() {
   
    return ( <div className="content">
    <div>
        <p className="collection-name">Collection Name</p>
    </div>
    <div className="inventory">
    {/* Replacing with data table or a material table   */}
    <table className="inventory-table">
        <tr className="header">
            <th>Name</th>
            <th>Qty</th>
            <th>Date Added</th>
            <th>Price Bought</th>
            <th>Current Price (Average)</th>
            <th>Description</th>
        </tr>
    </table>
    </div>
    <div>
    <AddItemModal show={this.state.showModal} hide= {this.toggleModal} submission={this.submit}></AddItemModal>
      
      <button onClick={this.toggleModal}>Toggle modal</button>
      <button onClick={e=>this.deleteItem(4)}>Delete</button>
    </div>
</div>
);
  }
}

export default InventoryPage;