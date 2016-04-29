var configs = {
  "home": {
    "templateUrl": "/home/home.html",
  },
  "instructors": {
    "list": {
      "templateUrl": "/instructors/list.html"
    },
    "detail": {
      "templateUrl": "/instructors/detail.html"
    }
  }
}

var localizedUrls = {
  "instructors": {
    "en": "instructors",
    "it": "insegnanti"
  }
};

angular
  .module("meeting")
  .run(["$state", "$rootScope",
    function ($state, $rootScope) {

      console.log($state);
  }]);

angular
  .module("meeting")
  .config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
    function($stateProvider, $urlRouterProvider, $locationProvider){

      $stateProvider
        .state('app', {
          abstract: true,
            url: '/{language:(?:en|it)}',
            template: '<ui-view/>',
            onEnter: ["$state", function($state) {
              $stateProvider
                  .state('app.instructors', { url: localizedUrls.instructors[$state.params.language], template: "<ui-view></ui-view>", abstract:true })
                  .state('app.instructors.list', { url: "/", templateUrl: "/instructors/list.html" })
                  .state('app.instructors.detail', { url: "/:key/", templateUrl: "/instructors/detail.html" });
            }]
          })
        .state('app.home', {
          url: "/", templateUrl: "/home/home.html"
        });

      // Default: Redirect to home (en)
      $urlRouterProvider.otherwise("/en");
      $locationProvider.html5Mode(true);
    }]);
