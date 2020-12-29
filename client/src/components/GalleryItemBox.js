import React from "react";
import Item from "./Item";

class GalleryItemBox extends React.Component {


    render () {
        let box = []
        for (let i = 0; i < this.props.list.length; i++) {
            if (this.props.list[i] != null) {
            box.push(
                <Item key={i+i%this.props.list.length} itemContent={this.props.list[i]}/>
            );
            }
        }
        return (
            <div className="container" style={{padding: "40px"}}>
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

export default GalleryItemBox;