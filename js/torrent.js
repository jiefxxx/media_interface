var app = angular.module('myApp', []);
app.controller('urlCtrl',function($scope,$interval){

  $scope.refresh_torrent = function(){
    $.ajax({
      url: 'http://'+SERVER+'/tm/info',
      type: 'get',
      dataType: 'json',
      success: function (data) {
         $scope.names = data.torrents;
      }
    });
  };
  $scope.add = function (){
    if($scope.url.match(/^magnet:.*/) != null) {
      //alert('Link is magnet');
      $scope.add_from_magnet($scope.url)
    }
    else if($scope.url.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i) != null) {
      //alert('Link is url');
      $scope.add_from_url($scope.url)
    }
    else if($scope.url[0] == '/'){
      alert('Link is file (not working)');
    }
    else{
      //alert('Nothing find');
    }
  }
  $scope.add_from_magnet = function (magnet) {
    $.ajax({
      url: 'http://'+SERVER+'/tm/add',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        console.log(data);
         $scope.url = "";
      },
      data: '{"magnet":"'+magnet+'"}'
    });
  };
  $scope.add_from_url = function (url) {
    $.ajax({
      url: 'http://'+SERVER+'/tm/add',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        console.log(data);
         $scope.url = "";
      },
      data: '{"url":"'+url+'"}'
    });
  };
  $scope.torrent_action = function(id,action){
    console.log({"id":id,"action":action})
    $.ajax({
      url: 'http://'+SERVER+'/tm/torrent_action',
      type: 'post',
      dataType: 'json',
      data: '{"id":'+id+',"action":"'+action+'"}'
    });
  };
  $scope.get_class = function(state){
    if(state=='downloading'){
      return 'success'
    }
    else if(state == 'seeding'){
      return 'warning'
    }
    else{
      return ""
    }
  };
  $scope.refresh_torrent();
  $interval(function () {
        $scope.refresh_torrent();
    }, 1000);
});
