import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props){
		super(props);
		this.state={
			name:'',
			email:'',
			password:''
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault();
		console.log(this.state.name, this.state.email, this.state.password)
		axios.post('/auth/signup', this.state).then(result=>{
			console.log('success', result);
			localStorage.setItem('mernToken', result.data.token);
			//update the user with a call to app js
			this.props.updateUser();

		}).catch(err =>{
			console.log('err', err)
		});
	}

	handleNameChange = (e)=>{ this.setState({name: e.target.value});}	

	handleEmailChange = (e)=>{ this.setState({email: e.target.value});}

	handlePasswordChange = (e)=>{ this.setState({password: e.target.value});}

	render(){
		if(this.props.user){
			return(<Redirect to="/profile" />)
		}
		return(
			<div>
			<h2>Sign up as a new user</h2>
				<form onSubmit={this.handleSubmit}>
				<div>
				<div>
					<input name="Name" placeholder="What is your name?" value={this.state.name} onChange={this.handleNameChange}/>
				</div>
				<div>
					<input name="Email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
				</div>
				<div>
					<input name="Password" placeholder="Password.." value={this.state.password} onChange={this.handlePasswordChange}/>
				</div>
					<input type='submit' value='sign me up' className='button'/>
				</div>
				</form>
			</div>
		)
	}
}

export default Signup;