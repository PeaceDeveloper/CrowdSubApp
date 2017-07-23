(function () {
    'use strict';
    angular.module('app')
      .controller('LoadingCtrl', LoadingCtrl);

    function LoadingCtrl($state, $ionicHistory, Storage, Backend) {

        Backend.distribute().then(function(res){
            if (res.data === 0)
                alert('Aplicação não pode ser inicializada neste momento');
            else
                if (res.data === 2)
                    $state.go('app.vote');
                else
                    $state.go('app.home');
                
        });

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
    }
})();
