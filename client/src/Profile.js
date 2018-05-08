import React, {Component} from 'react';

class Profile extends Component {
	render(){
		if(this.props.user){
			return(
				<div>
				<h2> Hello again, {this.props.user.name}!</h2>
				<h4> your email is: {this.props.user.email}</h4>
				</div>
				);
		}
		return(
			<div>
				<p> this is a profile page. you must be logged in to see</p>
				<p> would you like to <a href="/login"> Log In </a> or <a href="/signup">Sign up</a> ? </p>
			</div>
			)
	}
}

export default Profile;