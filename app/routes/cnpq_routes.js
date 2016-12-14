'use strict';

module.exports = function(server) {

	var cnpq = server.app.controllers.cnpq_controllers;

	//Retorna todas as grande áreas do cnpq que estão ativas no banco.
	server.get('/cnpq/grandesAreas', cnpq.retornaTodasGrandesAreas);

	//Retorna todas as áreas do cnpq que estão ativas no banco relacionadas a uma grande área.
	server.get('/cnpq/gradesAreas/:grd_codigo/areas', cnpq.retornaTodasAreas);

	//Retorna todas as subareas do cnpq que estão ativas no banco relacionadas a uma área.
	server.get('/cnpq/areas/:are_codigo/subareas', cnpq.retornaTodasSubAreas);
};