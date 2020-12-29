import React from 'react';
import GalleryItemBox from '../components/GalleryItemBox';
import Loading from '../components/Loading';
class PublicGalleryPage extends React.Component {
    constructor(props){
      super(props)
      this.state={
        itemsList:''
      }
     
    }
  componentDidMount(){
    fetch("/api/inv/"+this.props.location.state.params.id2)
    .then(res=>{ return res.json()})
    .then(ans=>this.setState({itemsList:ans}))
  }
  render(){
     let renderedContent;
     if(this.state.itemsList.length){
       renderedContent= (<div><GalleryItemBox list={this.state.itemsList}></GalleryItemBox></div>)
     }
    else if(Array.isArray(this.state.itemsList)&&this.state.itemsList.length===0){
        renderedContent= ( <div><h1>This user doesn't seem to have any items on public display.</h1></div>)
    }
    else if (this.state.itemsList===''){
      renderedContent= ( <div><Loading></Loading></div>)
    }
    return (
     renderedContent
    );
    
  }
}
  export default PublicGalleryPage;