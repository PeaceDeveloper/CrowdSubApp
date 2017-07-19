(function(){
  'use strict';
  angular.module('app')
    .factory('Backend', Backend);

  function getResult(result){
    return result;
  };

  function Backend(Storage, API_ENDPOINT, $http){


    function distribute(){
        return $http({
            method: 'GET',
            url: API_ENDPOINT.url
          }).then(getResult, function(res){
            Logger.error(res);
            return res;
          });
    }

    return{
      distribute:distribute
    };
  }
})();

