angular.module('appCtrlModule',[])
.controller("ApplicationCtrl",["$scope",function($scope){
  //programming code is written here
  $scope.appObject = { };
  $scope.appObject.name = "Harry Potter";
  $scope.appObject.firstName = "Emma";
  $scope.appObject.lastName="Watson";
  $scope.appObject.bindOutput =2;
  $scope.timeTwo = function(){
      $scope.appObject.bindOutput *=2;
  }
}]);