import React from "react";
import Item from "./Item";

class LandingPageItemBox extends React.Component {
    
    render () {
        let box = []
        for (let i = 0; i < 8; i++) {
            if (this.props.list[i] != null) {
            box.push(
                <Item key={i+i%8}  itemContent={this.props.list[i]}/>
            );
            }
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        
                    </div>
                    <div className="col-12 row wrap justify-content-center">
                        { box }
                    </div>
                    <div className="col">
           
                    </div>
                </div>
            </div>
        );

    }

}

export default LandingPageItemBox;