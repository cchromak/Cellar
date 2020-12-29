import React from 'react';

import ItemExpanded from './ItemExpanded';




class Item extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showItemExpanded: false,
        }
        this.toggleModal = this.handleSelect.bind(this)
    }
    handleSelect(){
        this.setState({
          showModal: this.state.showModal ? false : true
        })
      }
    
    render () {
      //  console.log(this.props.itemContent.dateAdded)
        let currName;
        if (this.props.itemContent.name.length > 12) {
            currName = this.props.itemContent.name.substring(0, 11) + '...';
        } else {
            currName =this.props.itemContent.name;
        }
        return (
            <div className="" style={{maxWidth: "250px",  padding: "10px",}}>
            <div className="shadow" style={{background: "white"}} >
                <button onClick={this.toggleModal} className="btn btn-lite item">  <img  width="200px" height="175px" src={this.props.itemContent.imageURL} alt="castle.jpg"></img> </button>
                <div className="card-footer small text-muted">
                    <div className="float-left">
                        <h6> { currName }</h6>
                    </div>
                    <div className="float-right">
                        <p>${this.props.itemContent.currentPrice }</p>
                    </div>
                    <p>  </p>
                    <ItemExpanded reloadContent={this.props.reloadContent} list={this.props.itemContent} show={this.state.showModal} hide= {this.toggleModal} user={this.props.user}  refreshPage={this.props.refreshPage}></ItemExpanded>
                </div>  
            </div>
            </div>

        );
    }
}

export default Item;