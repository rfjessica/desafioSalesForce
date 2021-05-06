'use strict';

var server = require('server');

/*Ao criarmos um CONTROLLER:
Além do SERVER, precisamos definir se a rota é GET ou POST, assim como a MODEL que será usada, o NOME DA ROTA, 
a FUNÇÃO PARA RETORNAR, o NEXT e exportar a rota, pra que ela esteja disponível na storefront*/

server.get('MinhaRota', function(req, res, next){
    res.json({
        Teste: 'MinhaRota'
    });
    next();
})

/*Exemplo de URL para acesso ao controller: 
zzrl-039.sandbox.us01.dx.commercecloud.salesforce.com/on/demandware.store/Store/Sites-RefArch-Site/en_US/Teste-MinhaRota
onde: "Teste" é o controller, que permite acesso à função "MinhaRota"
*/

//BasketMgr é a API do B2C (Commerce API)

//https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fsite_development%2Fb2c_working_with_controllers.html

module.exports = server.exports(); //para exportar a rota