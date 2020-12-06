import './App.css';
import React from "react"
import axios from "axios"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';

class App extends React.Component{
  constructor(){
    super();
    this.state={
      userName:"",
      userImage:"",
      userDescription:""
    }
  }
  handleChanges = e =>{
    e.preventDefault()
    this.setState({
      userName:e.target.value
    })
  }
  fetchUsers = (e) =>{
    e.preventDefault()
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(res =>{
      this.setState({
        userName:res.data.name,
        userImage:res.data.avatar_url,
        userDescription: res.data.bio
      })
    })
    .catch(err => console.log (err))
  }
  componentDidMount() {
    axios.get('https://api.github.com/users/Bradleydion')
    .then(res =>{
      console.log(res);
      this.setState({
        userName:res.data.name,
        userImage:res.data.avatar_url,
        userDescription: res.data.bio
      })
    })
    .catch(err => console.log (err))
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.userName !== this.state.userName){
      console.log("users have changed")
    }
  }
  onClick = e =>{
    e.preventDefault()
    this.setState({
      userName:""
    })
  } 
  render(){
    return(

      // <div>
      //   <h1>Git Hub Users</h1>
      // </div>

      <div className="App">
        <div className="Header"><h1>Github User Cards</h1></div>
        <Card className="Card">
          <CardImg topwidth="100%" src={this.state.userImage} alt="Card image cap"/>
          <CardBody>
            <CardTitle tag="h5">{this.state.userName}</CardTitle>
            <CardText>{this.state.userDescription}</CardText>
          </CardBody>
        </Card>
        <form onSubmit={this.fetchUsers}><input 
        placeholder="Github Username"
        value={this.state.userName}
        type="text"
        onChange={this.handleChanges}
        />
        <Button 
        onClick={this.fetchUsers}
        >Get Users Info</Button></form>
      </div>
    )
  }
}

export default App;
