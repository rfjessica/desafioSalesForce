'use strict';

var getStock = function (productSKU){ 
    var responseObj = { totalAvailable: 1 };
    return responseObj;
};

module.exports = {
    getStock: getStock
};

/*getstock acessa a API REST do ERP do cliente, que retorna a quantidade (disponível no estoque) do produto, 
com base no código de barras.*/