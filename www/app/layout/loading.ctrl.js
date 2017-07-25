(function () {
    'use strict';
    angular.module('app')
      .controller('LoadingCtrl', LoadingCtrl);

    function LoadingCtrl($state, $ionicHistory, Storage, Backend, $rootScope) {

        $state.go('app.home');

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
    }
})();
