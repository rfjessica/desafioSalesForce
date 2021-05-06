'use strict';

var base = module.superModule;

module.exports = function fullProduct(product, apiProduct, options) {
    var meuAtributoTesteDecorator = require('*/cartridge/models/product/decorators/meuAtributoTeste');
    //O CONTROLLER deve ter o nome do atributo que você criou

    base.call(this, product, apiProduct, options);

    meuAtributoTesteDecorator(product, apiProduct);

    //apiProduct é uma classe, que vem do controller
    return product; //objeto JSON
};
