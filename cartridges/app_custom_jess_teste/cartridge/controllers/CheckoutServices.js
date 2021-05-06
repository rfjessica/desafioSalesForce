'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.extend(module.superModule); //mantém a referência para o app_storefront_base, para o path de cartridges

server.append( //o método APPEND adiciona à rota comportamento(s) que já existe(m) no SFRA
    'submitPayment', //nome da rota
    server.middleware.https, //o middleware força a requisição HTTPS
    csrfProtection.validateAjaxRequest, //este middleware (csrfProtection) valida a requisição, para saber se ela vem do mesmo domínio do controller
    function (req, res, next){ //middleware sobre o comportamento na body
        var apiStockHelper = require('*/cartridge/scripts/helpers/apiStockHelper');
        var BasketMgr = require('dw/order/BasketMgr');
        var currentBasket = BasketMgr.getCurrentBasket(); //retorna os produtos que estão no carrinho e seus respectivos dados
        var Resource = require('dw/web/Resource');
        var errors = [];
        var collections = require('*/cartridge/scripts/util/collections');
        collections.forEach(currentBasket.productLineItems, function (productLine) { //percorre a productLine (array com todos os produtos adicionados ao carrinho)
            
            var responseObj = apiStockHelper.getStock(productLine.productID); //a var recebe cada item do carrinho (de acordo com o id)
            
            if (responseObj && responseObj.totalAvailable < productLine.quantityValue) { //validação do estoque
                /*se o total disponível no estoque for menor do que a quantidade que o cliente adicionou ao carrinho:
                exibe uma mensagem de erro na tela do ckeckout e não deixa prosseguir com o pagamento*/
                
                errors.push(Resource.msgf( //msgf permite a passagem de parâmetros dinâmicos
                    'stock.unavailability',
                    'api_stock',
                    null,
                    productLine.productID //para cada item do array, no caso de produto indisponível, ativa o método stock.unavailability, que substitui a chave {0} pelo id (código de barras) do produto
                   //productLine.productName (o método stock.unavailability substitui a chave {0} pelo nome do produto)
                ));
            }
        });

        if (errors.length) {
            // respond with form data and errors
            res.json({
                serverErrors: errors,
                error: true
            });
            return next();
        }

        next();

    });