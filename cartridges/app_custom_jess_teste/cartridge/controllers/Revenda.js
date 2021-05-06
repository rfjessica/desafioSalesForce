//Projeto desenvolvido por Jessica Rangel Freire
//Accademia Accenture - Gama Academy - Desafio Individual
//Rio de Janeiro, 05/05/2021

'use strict';

var server = require('server');

server.get('NovoRevend', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var meuForm = server.forms.getForm('feirante'); /*"feirante" é meu form em xml*/ 
    meuForm.clear();

    res.render('/contatosFeira/contatoFeirante', {
        actionUrl: URLUtils.url('Revenda-CadRevend').toString(), /*"Revenda" é meu CONTROLLER e "CadRevend", a ACTION (função que eu defini)*/
        meuForm: meuForm
        /*"contatosFeira" é minha pasta em templates. "contatoFeirante" é meu template (arquivo isml)*/
    });

    next();
});

server.post('CadRevend', server.middleware.https, function (req, res, next) {
    var meuForm = server.forms.getForm('feirante');
    var transaction = require('dw/system/Transaction');
    var customObjMgr = require('dw/object/CustomObjectMgr');
    transaction.wrap(function () {
        var newSubscribe = customObjMgr.createCustomObject('Revend', meuForm.email.value);
        //newSubscribe recebe Revend (meu CustomObjectType) e o valor do e-mail, que será a chave
        newSubscribe.custom.nome = meuForm.nome.value;
        newSubscribe.custom.phone = meuForm.phone.value;
        newSubscribe.custom.cidade = meuForm.cidade.value;
        newSubscribe.custom.estado = meuForm.estado.value;       
    });

    res.render('/contatosFeira/contatoSucesso', {
        meuForm: meuForm
    });

    next();
});

module.exports = server.exports();
