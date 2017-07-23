(function(){
  'use strict';
  angular.module('app')
    .controller('VoteCtrl', VoteCtrl);

  function VoteCtrl($scope, Storage, UiUtils, Backend, API_ENDPOINT){
    var format = "YYYY-MM-DD HH:mm:ss"

      function loadTask2(){
        $scope.task2 = {};
        $scope.task2Submit = {};
        $scope.video = {};
        Backend.getTask2().then(function(res){
          console.log(res);
          $scope.task2 = res.data;
          $scope.task2Submit.tinicial = moment(new Date()).format(format);
          $scope.task2Submit.id_video = $scope.task2.id_video;
          var urlVideo = null;
          urlVideo = API_ENDPOINT.url + "videos/"+res.data.id_video+".mp4";
          //urlVideo = API_ENDPOINT.url + "video/inglourious-basterds-english.mp4";
          var myVideo = document.getElementsByTagName('video')[0];
          myVideo.src = urlVideo;
          myVideo.load();
          myVideo.play();
        }, Logger.error);
      }
      loadTask2();

      $scope.save = function(leg){
        $scope.task2Submit.id_legenda = leg.id;        
        $scope.task2Submit.tfinal = moment(new Date()).format(format);
        Storage.getUser().then(function(user){
          if (user){
            $scope.task2Submit.fingerprint = user;
            console.log($scope.task2Submit);
            Backend.saveTask2($scope.task2Submit).then(function(res){
              console.log(res);
              alert('saved');
              loadTask2();
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
