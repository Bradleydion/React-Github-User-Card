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
    this.setState({
      ...this.state,
      userName:e.target.value
    })
  }
  fetchUsers = () =>{
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(res =>{
      this.setState({
        ...this.state,
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
        ...this.state,
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
  render(){
    return(

      // <div>
      //   <h1>Git Hub Users</h1>
      // </div>

      <div>
        <Card>
          <CardImg topwidth="100%" src={this.state.user} alt="Card image cap"/>
          <CardBody>
            <CardTitle tag="h5">{this.state.userName}</CardTitle>
            <CardText>{this.state.userDescription}</CardText>
          </CardBody>
        </Card>
        <input 
        placeholder="Github Username"
        value=""
        type="text"
        onChange={this.handleChanges}
        />
        <Button 
        onClick={this.fetchUsers}
        >Get Users Info</Button>
      </div>
    )
  }
}

export default App;
