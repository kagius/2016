(function () {
  "use strict";

  angular
    .module("meeting")
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
      function($stateProvider, $urlRouterProvider, $locationProvider){

        // Application root
        $stateProvider
          .state("app", {
            "abstract": true,
            "url": "/",
            "template": "<ui-view/>"
          });

          var languages = ["en", "it"];

          var localizedUrls = {
            "instructors": {
              "en": "instructors",
              "it": "insegnanti"
            }
          };

          var controllerFactory = function(languageCode) {
              return function($rootScope, $state, $translate) {
                $rootScope.language = languageCode;
                $translate.use(languageCode);
                $rootScope.localizeRoute = function(suffix, params) {
                  return $state.href("app." + languageCode + "." + suffix, params);
                };
                $rootScope.localizeCurrentRoute = function(languageCode) {
                  return $state.href("app." + languageCode + "." + $state.current.suffix, $state.params);
                };
              };
          };

          // localised routes. These will be in the form app.en, app.it, etc.
          for (var i = 0; i < languages.length; i++) {

            var languageCode = languages[i];
            var localisedRoot = "app." + languageCode;

            $stateProvider
              .state(localisedRoot, {
                "abstract": true,
                "url": languageCode,
                "template": "<ui-view/>",
                "controller": ["$rootScope", "$state", "$translate", controllerFactory(languageCode)]
              })
              .state(localisedRoot + ".home", {
                "url": "",
                "suffix": "home",
                "templateUrl": "/home/home.html",
                "controller":"homeCtrl"
              })
              .state(localisedRoot + ".instructors", {
                "abstract": true,
                "url": "/" + localizedUrls.instructors[languageCode],
                "template": "<ui-view/>"
              })
              .state(localisedRoot + ".instructors.list", {
                "url": "",
                "suffix": "instructors.list",
                "templateUrl": "/instructors/list.html",
                "controller": "instructorListCtrl"
              })
              .state(localisedRoot + ".instructors.detail", {
                "url": "/:key",
                "suffix": "instructors.detail",
                "templateUrl": "/instructors/detail.html"
              });
          }

          // Default: Redirect to home (en)
          $urlRouterProvider.otherwise("/en");
          $locationProvider.html5Mode(true);
        }]);
})();
