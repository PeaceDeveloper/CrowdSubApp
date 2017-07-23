(function(){
  'use strict';
  angular.module('app')
    .constant('C', {
      backendUrl: 'data'
    })
    .constant('API_ENDPOINT', {
        url: 
        //"http://secret-meadow-82120.herokuapp.com/"
        "http://46.101.129.171:8080/"
        //"https://smartcareapp.azurewebsites.net/"
    });
})();
