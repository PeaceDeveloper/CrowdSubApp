(function () {
    'use strict';
    angular.module('app')
      .controller('DeviceReadyCtrl', DeviceReadyCtrl);

    function DeviceReadyCtrl($state, $log, $rootScope) {
        ionic.Platform.ready(function() {
            Logger.Config.log = $log;
            //the log aways will be send.
            Logger.Config.logToConsole = false;
            $state.go('loading');
        });
    }
})();
