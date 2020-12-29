import React from 'react';
import Item from './Item';


class ItemList extends React.Component {
    
    render() {
        let List = []
        for (let i = 0; i < this.props.items.length; i++) {
            if (this.props.category === this.props.items[i].category) {
                List.push(
                <Item key={i+i%this.props.items.length}reloadContent={this.props.reloadContent} itemContent={this.props.items[i]} user={this.props.user} refreshPage={this.props.refreshPage}/>
            );
            }
            
        }
        
        return (
            <div className="itemList">
                <div className="container-fluid ">
                    <div className="text-left">
                        <h5><span>{ this.props.category }</span></h5>
                    </div>
                    
                    <div className="row flex-nowrap overflow-auto">
                        { List }
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemList;