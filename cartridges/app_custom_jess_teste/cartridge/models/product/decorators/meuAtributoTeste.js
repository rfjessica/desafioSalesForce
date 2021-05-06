'use strict';

module.exports = function (object, apiProduct) {
    //apiProduct é a classe, que vem do controller
    //object é o tipo do objeto que recebe o atributo e vai ser "decorado"
    
    Object.defineProperty(object, 'meuAtributoTeste', {
        enumerable: true,
        value: apiProduct && apiProduct.custom.meuAtributoTeste ? apiProduct.custom.meuAtributoTeste : ''
        //value: apiProduct && apiProduct.custom.(nome do atributo que eu criei) ? apiProduct.custom.(nome do atributo que eu criei) : ''
       
       /*Para ATRIBUTOS "DEFAULT", OU SEJA, OS QUE JÁ EXISTEM NA PLATAFORMA, TEMOS: 
            value: apiProduct && apiProduct.(nome do atributo) ? apiProduct.(nome do atributo) : ''
       */       

        /*Ver a partir de 03h este vídeo:
        https://zoom.us/rec/play/sckP9j-t2rh00jbcpIrzGIAg6nJlW9fClPgocp8YuPCptyeu7O6fxl3wGvNhlmAcDVZU-fAhcS2bdD00.0qx9fDJaU-wHy5DP?continueMode=true&_x_zm_rtaid=FAwT2IvXRF28RkILaCjm3w.1618755704306.1dfd3fb7640b9cae85cae5789afad87b&_x_zm_rhtaid=352
        */
    });
};
