import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from './Table'
class TableViewModal extends React.Component{
    constructor(props){
         super(props)
         this.state={
         
        }

    }
    
    render(){
       
    return( 
      <Modal size="xl" show={this.props.show} onHide={this.props.hide} >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table itemsList={this.props.items}></Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={e=>this.props.hide()}>Close</Button>
        </Modal.Footer>
      </Modal>     
    );}
  }
  export default TableViewModal;