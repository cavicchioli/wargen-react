'use strict';

module.exports = function(server) {

	server.get('/login', function(req, res) {  
		res.render('pages/home/login',{titulo:'Login'})});

	server.get('/cadastrar', function(req, res) {  
		res.render('pages/home/signup',{titulo: 'Cadastrar'})});

	server.get('/home',function(req,res) {
		res.render('pages/home/home',{titulo:'Home'})});


	server.get('/cubo',function(req,res) {
		res.render('pages/wargen/cubo',{titulo:'Cubo'})});

	server.get('/dev',function(req,res) {
		res.render('pages/wargen/dev',{titulo:'Desenvolvimento'})});


	server.get('/projeto',function(req,res) {
		res.render('pages/wargen/novo-projeto',{titulo:'Novo Projeto'})});

};