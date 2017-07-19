(function(){
  'use strict';
  angular.module('app')
    .controller('VoteCtrl', VoteCtrl);

  function VoteCtrl($scope, Storage, UiUtils){
    var fn = {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
  }
})();
