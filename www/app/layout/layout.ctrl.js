(function () {
    'use strict';
    angular.module('app')
      .controller('LayoutCtrl', LayoutCtrl);

    function LayoutCtrl($state, $rootScope, $ionicTabsDelegate, $scope, 
    $ionicHistory, Storage, $ionicLoading, UiUtils, $ionicModal, $ionicPopup) {
        
        var fn = {};
        $scope.fn = fn;

        fn.logout = function () {
            Storage.clear().then(function () {
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go('login');
            });
        };
    }
})();
