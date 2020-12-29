import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AddItemModal from './ItemSubmissionModal';


class ItemExpanded extends React.Component {
    constructor(props){
        super(props)
        this.state={
            showModal:false,
        }
        this.toggleModal = this.handleSelect.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    handleSelect(){
        this.setState({
          showModal: this.state.showModal ? false : true
        })
    }

    confirmDelete() {
        let deleteItem = window.confirm("Are you sure you want to delete " + this.props.list.name  + "?" );
        if (deleteItem) {this.itemDeleted()};
    }

    itemDeleted() {
        fetch("/api/inv/" + this.props.list.id, {
            method: 'DELETE',
    })
    .then(post => {
        this.props.refreshPage();
        this.props.hide();
    })
    }

    itemEdit() {
        fetch("/api/inv/" + this.props.list.id, {
            method: 'PUT',
    })
}
    


    render () {
       let addedButtons;
        if (this.props.user && this.props.user.id === this.props.list.OwnderId) {
            addedButtons = (
                <div >
                    <button className="btn btn-secondary" style={{margin: "5px"}} onClick={this.toggleModal}>Edit</button>
                    <button className="btn btn-danger" style={{margin: "5px"}} onClick={this.confirmDelete}>Delete</button>
                </div>
            );
        }
        let currPrice = this.props.list.currentPrice;
        let purPrice = this.props.list.purchasePrice;
        let profit = currPrice - purPrice;
        let currentMoneyStanding;
        if (profit > 0) {
            currentMoneyStanding = 'Currenty up +'
        } else if (profit === 0){
            currentMoneyStanding = 'You are dead even.';
        } else {
            currentMoneyStanding = 'Currently down ';
        }
        profit = profit.toFixed(2);

        let date = this.props.list.dateAdded;
        date = date.substring(0,10);
        return (
            <Modal size='sm' show={this.props.show} onHide={this.props.hide}>
            <Modal.Header closeButton>
                <Modal.Title >{ this.props.list.name }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ul className="list-group list-group-flush">
                       <li className="list-group-item text-left">Date Added: { date }</li>
                       <li className="list-group-item text-left">Purchase Price: { this.props.list.purchasePrice }</li>
                       <li className="list-group-item text-left">Current Price: { this.props.list.currentPrice }</li>
                       <li className="list-group-item text-left"> { currentMoneyStanding + profit } </li>
                       <li className="list-group-item text-left word-break" style={{wordWrap:"break-word"}} >Description: { this.props.list.description }</li>    
            </ul>
            <div className="d-flex justify-content-end" style={{paddingTop: "15px"}}>
                { addedButtons }
                <AddItemModal reloadContent={this.props.reloadContent} edit={true} values={this.props.list} show={this.state.showModal} hide= {this.toggleModal}></AddItemModal>
            </div>
            </Modal.Body>
            </Modal>
        );
    }
}

export default ItemExpanded;

