(function () {
    'use strict';
    angular.module('app')
      .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, $state, Storage, Backend) {
      $scope.taskEnabledNumber = {};
       $scope.taskEnabled(Backend).then(function(taskEnabled){
        $scope.taskEnabledNumber.id = taskEnabled;
       })
    }
})();
