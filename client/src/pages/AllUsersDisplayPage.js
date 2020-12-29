import React from 'react';
import Loading from '../components/Loading';
import UserInfoPublic from '../components/UserInfoPublic';

class AllUsersDisplayPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usersList:'',
         
        }
    }

    componentDidMount(){
        
        fetch('/api/userspage/').then(res=>{return res.json()}).then(
            users=>{this.setState({usersList:users})}
        )
    }
    componentDidUpdate(prevProps) {
 
        if(prevProps.login !== this.props.login) {
         this.componentDidMount();
        }
      }

    render(){

       let renderedContent;
       if(!this.state.usersList.length){
          renderedContent= (<div><Loading/></div>)
       } 
       else{
          let userList = []
          for(let i=0;i<this.state.usersList.length;i++){
             userList.push(<UserInfoPublic key={i+i%this.state.usersList.length} list={ this.state.usersList[i] }/>)
          }
          renderedContent= (userList)
       }

       return(
        <div className="container"style={{ paddingTop: "50px"}}>
                <div className="row justify-content-center">
                    {/* <div className="col">
                    </div> */}
                    <div className="row wrap">
                        { renderedContent }
                    </div>
                    {/* <div className="col">
                    </div> */}
                </div>
            </div>
       );
    //    return(<div>{renderedContent}</div>);
    }
}

export default AllUsersDisplayPage;