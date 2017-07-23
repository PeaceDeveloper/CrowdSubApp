(function () {
    'use strict';
    angular.module('app')
      .controller('OpnionCtrl', OpnionCtrl);

    function OpnionCtrl($scope, $state, Storage, Backend, API_ENDPOINT) {
      var format = "YYYY-MM-DD HH:mm:ss"

      function loadTask1(){
        $scope.task1 = {};
        $scope.video = {};
        $scope.task1Submit = {legenda:null};
        Backend.getTask1().then(function(res){
          console.log(res);
          $scope.task1 = res.data;
          $scope.task1.tinicial = moment(new Date()).format(format);
          var urlVideo = null;
          urlVideo = API_ENDPOINT.url + "videos/"+res.data.id_video+".mp4";
          //urlVideo = API_ENDPOINT.url + "video/inglourious-basterds-english.mp4";
          var myVideo = document.getElementsByTagName('video')[0];
          myVideo.src = urlVideo;
          myVideo.load();
          myVideo.play();
        }, Logger.error);
      }
      loadTask1();

      $scope.save = function(){
        $scope.task1.legenda = $scope.task1Submit.legenda;
        $scope.task1.tfinal = moment(new Date()).format(format);
        Storage.getUser().then(function(user){
          if (user){
            $scope.task1.fingerprint = user;
            console.log($scope.task1);
            Backend.saveTask1($scope.task1).then(function(res){
              console.log(res);
              alert('saved');
              loadTask1();
            }, function(err){
              alert("Um erro ocorreu");
              console.log(err);
            });
          }else{
            alert("Usuário não autenticado");
          }
        });
      }
    }
})();
