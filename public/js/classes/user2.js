$("#btnCriaUsuario").click(function () {


	 //MODEL
    var Usuario = function (nome, email, email_conf, senha, senha_conf) {
        this.nome = nome;
        this.email = email;
        this.email_conf = email_conf;
        this.senha = senha;
        this.senha_conf =senha_conf;
    };

    var db=[];

db.push(new Usuario( 
				  { nome:$('#nome').val(), 
					email: $('#email').val(),
					email_conf:$('#email_conf').val(),
					senha:$('#senha').val(),
					senha_conf:$('#senha_conf').val()
				}));


console.log(db);

/*console.log({
                nome: $('#nome').val(),
                email: $('#email').val(),
                email_conf: $('#email_conf').val(),
                senha: $('#senha').val(),
                senha_conf:$('#senha_conf').val()}); */

   $.ajax({
        type: "POST",
        url: "/usuario/criar",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(db)
    }).done(function (response) {
        console.log(response);
    });

});