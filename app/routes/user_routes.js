/**
 * @author Victor Cavichiolli ~xvictorprado@gmail.com
 * @since 2016-11-18
 */

'use strict';

module.exports = function(server) {


	//ROTAS DA API DE USUARIOS

	//forma antiga de fazer o require
	//var user = require("../../app/controllers/users.js");

	//fazendo a chamada para poder todas as funções do controller user
	//server/app/controllers/users.js (que foi carregado via consign)
	var user = server.app.controllers.user_controllers;

	//Create a new user.
	server.post('/users', user.newUser);

	//Create a new user session (login).
	server.post('/users/session', user.validateUserSession);
	
	//Delete a user session (logout).
	server.delete('/users/session/:email', user.deleteUserSession);
	
	//Delete a user account.
	server.delete('/users/:email', user.deleteUser);

	//Alter user password.
	server.post('/users/:email', user.alterUserPassword);

	//Return all users from db.
	server.get('/users', user.validateUserToken, user.returnAllUsers);

	//Return an user from db.
	server.get('/users/:email',user.returnUser);


	
	
	

	//validateUserToken - middleware
	





	//rote to login a user and create a token
	//server.post('/login', user.login);


	//Middleware to check if the user have a token, and if this is valid.
	//server.use(user.checkLogin);

	//If login it's ok, the app send you to main/home page
	//server.get('/app', user.checkLogin, user.home);

	//Get all users from DB
	//server.get('/users', user.checkLogin, user.list);

	//Get logged user informations (decoded)
	//server.get('/me', user.checkLogin, user.getUserInformation);
	//



	/*
	RESTful can be used as a guideline for constructing URLs, and you can make sessions and users resources:

	GET    /session/new gets the webpage that has the login form
	POST   /session authenticates credentials against database
	DELETE /session destroys session and redirect to /
	GET  /users/new gets the webpage that has the registration form
	POST /users records the entered information into database as a new /user/xxx
	GET  /users/xxx // gets and renders current user data in a profile view
	POST /users/xxx // updates new information about user
	*/
};