require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res) {
 	User.findOne({email:req.body.email}).then(function(user){
 		if(!user || !user.password){
 			return res.status(403).send('user not found');
 		}
 		//the user exists, we can validate the password
 		if(!user.authenticated(req.body.password)){
 			//user is invalid... 
 			return res.status(401).send('invalid credentials');
 		}
 		//the user is valid!
 		var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
 			expiresIn: 60 * 60 * 24
 		})
 		res.send({ user:user, token: token })
 	}).catch(function(err){
 		console.log(err)
 		return res.status(503).send('database error')
 	})
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res) {
  console.log('/auth/signup post route', req.body);
  
  //TODO: First check if the user already exists
  User.findOne({email:req.body.email }).then(function(user){
  	//database call was a success
  	if(user){
//if a user exists already, don't let them create duplicate account
//they should instead log in
  	return res.status(400).send('user exists already')
  	}
  	//if you are here, this is a new user, make an account
  	User.create(req.body).then(function(createdUser){
  		//make a token and send it as json, so user can remain logged in
  		let token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
  			expiresIn: 60 * 60 * 24 //24 hours! in seconds..
  		});
  		res.send({user: createdUser, token:token })
  	}).catch(function(err){
  		console.log('err', err)
  		res.status(500).send('could not create user in DB')
  	})
  }).catch(function(err){
  	console.log(err)
  	res.status(500).send('Database error! :(')
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  res.send({user: req.user });
});

module.exports = router;


























