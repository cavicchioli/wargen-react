var vm = (function() {
    "use strict";

    var novoUsuario = new Usuario("", "", "", "", "", "");

    var limparNovoUsuario = function() {
        novoUsuario.id("");
        novoUsuario.nome("");
        novoUsuario.email("");
        novoUsuario.email_conf("");
        novoUsuario.senha("");
        novoUsuario.senha_conf("");
    }

    var addUsuario = function(data) {
        var id = "";
        var usuario = Usuario(
            id,
            data.nome(),
            data.email(),
            data.email_conf(),
            data.senha(),
            data.senha_conf()
        );
        catalog.push(product);
        clearNewProduct();
        console.log(product);
    };

   

    

    return {
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct
    };
})();

ko.applyBindings(vm);