angular
  .module("meeting")
  .controller("instructorListCtrl", ["$scope", function($scope) {

    $scope.data = [
      {
        "key": "A",
        "name": "Test 1",
        "country": { "code":"mt", "name":"Malta" },
        "organization": { "code": "mhfa", "name": "Malta Historical Fencing Association" }
      },
      {
        "key": "B",
        "name": "Test 2",
        "country": { "code":"it", "name":"Italy" },
        "organization": { "code": "test", "name": "Test" }
      }
    ]
  }]);
