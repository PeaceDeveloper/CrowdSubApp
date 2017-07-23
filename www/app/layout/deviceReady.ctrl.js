(function () {
    'use strict';
    angular.module('app')
      .controller('DeviceReadyCtrl', DeviceReadyCtrl);

    function DeviceReadyCtrl($state, $log, Storage) {
        ionic.Platform.ready(function() {
            Logger.Config.log = $log;
            //the log aways will be send.
            Logger.Config.logToConsole = false;
            Storage.getUser().then(function(user){
                if (!user)
                    Storage.setUser();
                $state.go('loading');
            })
        });
    }
})();
