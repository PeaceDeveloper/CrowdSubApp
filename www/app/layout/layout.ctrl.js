(function () {
    'use strict';
    angular.module('app')
      .controller('LayoutCtrl', LayoutCtrl);

    function LayoutCtrl($state, $rootScope, $ionicTabsDelegate, $scope, 
    $ionicHistory, Storage, $ionicLoading, UiUtils, $ionicModal, $ionicPopup) {
        
        var fn = {};
        $scope.fn = fn;

        $scope.taskEnabled = function(Backend){
            return Backend.distribute().then(function(res){
                return res.data.task;
            });
        }

        fn.logout = function () {
            Storage.clear().then(function () {
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go('login');
            });
        };
    }
})();
