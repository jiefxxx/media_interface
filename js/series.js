var app = angular.module('Series', []);
app.factory('GET', function($q) {
  return{
    series: function(){
      var deferred = $q.defer();
      $.ajax({
        url: 'http://'+SERVER+'/media/series',
        type: 'get',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          deferred.resolve(data.series);
          }
        });
      return deferred.promise;
    },
    serie: function(name){
      var deferred = $q.defer();
      $.ajax({
        url: 'http://'+SERVER+'/media/series/'+name,
        type: 'get',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          deferred.resolve(data);
          //$scope.show($scope.series[0])
        }
      });
      return deferred.promise;
    }
  }
})

app.controller('seriesCtrl',function($scope,$window,GET){
  GET.series().then(function(series) {
      $scope.series = series;
      $scope.show(series[0])
    }, function(error) {
      console.log(error)
      $scope.error = error;
      $scope.series = [];
  });

  $scope.show = function(name){
    GET.serie(name).then(function(data) {
        //console.log(data.name)
        $scope.data_show = data;
        //console.log($scope.show_name)
      }, function(error) {
        console.log(error)
        $scope.error = error;
        $scope.show_data = {};
    });
  };
});
