import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ItemList from './ItemList';
import TableViewModal from './TableViewModal';

class ItemListBox extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tableToggle:false,
            uniqueCategories:"",
          }
        this.toggle=this.toggleTable.bind(this)
    }
    toggleTable(){
        this.setState({
            tableToggle: this.state.tableToggle ? false : true
        })
    }

   
    render () {
        let uniqueCategories = [];
        
        for(let i = 0; i < this.props.list.length; i++) {
            if (!uniqueCategories.includes(this.props.list[i].category)) {
                uniqueCategories.push(this.props.list[i].category)
            }
        }
        let itemListBox = [];
        for(let i = 0; i < uniqueCategories.length; i++) {
            itemListBox.push(
                <ItemList key={i+i%uniqueCategories.length} reloadContent={this.props.reloadContent} items={this.props.list} user={this.props.user} refreshPage={this.props.refreshPage} category={uniqueCategories[i]}/>
            )
        }
        
        return (
            <div>
                <div>
                {itemListBox}
                {/* <ItemList reloadContent={this.props.reloadContent} items={this.props.list} user={this.props.user} refreshPage={this.props.refreshPage} /> */}
                <TableViewModal items={this.props.list}show={this.state.tableToggle} hide={this.toggle}></TableViewModal>
                <Button onClick={this.toggle} className="btn-secondary">Table View</Button>
                </div>
            </div>
        )
    }
}

export default ItemListBox;