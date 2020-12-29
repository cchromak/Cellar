import React from 'react';
import { TableContainer, TableRow, TableHead, TableCell,TableBody, Table}  from '@material-ui/core';

class InventoryTable extends React.Component {
    constructor(props){
        super(props)
        this.state={
            itemsList:''
        }
    }


  /*  componentDidMount() {
        Promise.all([fetch("/api/inv/"), fetch('/api/loggedInUser/')])
          .then(([inv, user]) => { return Promise.all([inv.json(), user.json()]) })
          .then(([inv, user]) => {
            this.setState({itemsList: inv})
     
        });
        console.log(this.state.itemsList)
    }*/

    

    createData(name, qty, date_added, price_bought, price_curr) {
        return { name, qty, date_added, price_bought, price_curr };
    }

    render(){
        const columns = [
            {
                id: 'name',
                label: 'Name', 
                minWidth: 170
            },
            {
                id:'quantity',
                label:'Quantity',
                minWidth:170,
                align:'right'
            },
            {
                id:'date_added',
                label:'Date Added',
                minWidth: 170,
                align:'right'
            },
            {
                id:'price_bought',
                label:'Price Bought',
                minWidth:170,
                align:'right'
            },
            {
                id:'current_price',
                label:'Current Price',
                minWidth:170,
                align:'right'
            }
        ];
        
      
        return (
            <div > 
                <TableContainer>
                    <Table stickyHeader aria-label="Label">
                        <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.itemsList.map((row) => (
                                <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.dateAdded}</TableCell>
                                <TableCell align="right">{row.purchasePrice}</TableCell>
                                <TableCell align="right">{row.currentPrice}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    
        }        
}

export default InventoryTable;
