(function () {
    'use strict';
    angular.module('app')
      .controller('LoadingCtrl', LoadingCtrl);

    function LoadingCtrl($state, $ionicHistory, Storage, Backend) {

        Backend.distribute().then(function(res){
            if (res.data === 0)
                alert('Aplicação não pode ser inicializada neste momento');
            else 
                if (res.data === 1)
                    $state.go('app.opnion');
                else
                    $state.go('app.vote');
                
        });

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
    }
})();
