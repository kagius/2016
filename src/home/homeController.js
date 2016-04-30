angular
  .module("meeting")
  .controller("homeCtrl", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {

    $http
      .get("/content/home/home-" + $rootScope.language + ".json")
      .then(function(response){
        var data = response.data;
        $scope.keywords = data.keywords;
        $scope.description = data.description;
        $scope.content = data.content;
      });
  }]);
