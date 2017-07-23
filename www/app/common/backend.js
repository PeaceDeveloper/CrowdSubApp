(function(){
  'use strict';
  angular.module('app')
    .factory('Backend', Backend);

  function getResult(result){
    return result;
  };

  function Backend(Storage, API_ENDPOINT, $http){

    var task1 = API_ENDPOINT.url + 'api/task1';
    var task2 = API_ENDPOINT.url + 'api/task2';

    function distribute(){
        return $http({
            method: 'GET',
            url: API_ENDPOINT.url
          }).then(getResult, function(res){
            Logger.error(res);
            return res;
          });
    };

    function getTask1(){
      return $http({
            method: 'GET',
            url: task1
          }).then(getResult, function(res){
            Logger.error(res);
            return res;
          });
    }

    function saveTask1(postTask1){
      return $http.post(task1, postTask1).
        success(function(data) {
          console.log("tarefa 1 salva com sucesso");
          return data;
        }).error(function(data) {
          console.error("erro na postagem da tarefa 1");
          return data;
        })
    }

    function getTask2(){
      return $http({
            method: 'GET',
            url: task2
          }).then(getResult, function(res){
            Logger.error(res);
            return res;
          });
    }

    function saveTask2(postTask2){
      return $http.post(task2, postTask2).
        success(function(data) {
          console.log("tarefa 2 salva com sucesso");
          return data;
        }).error(function(data) {
          console.error("erro na postagem da tarefa 2");
          return data;
        })
    }

    return{
      distribute:distribute,
      getTask1:getTask1,
      saveTask1:saveTask1,
      getTask2:getTask2,
      saveTask2:saveTask2
    };
  }
})();

