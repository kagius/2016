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
            return function($rootScope, $state) {
              $rootScope.language = languageCode;
              $rootScope.localizeRoute = function(suffix) {
                return $state.href("app." + languageCode + "." + suffix);
              }
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
              "controller": ["$rootScope", "$state", controllerFactory(languageCode)]
            })
            .state(localisedRoot + ".home", {
              "url": "",
              "templateUrl": "/home/home.html"
            })
            .state(localisedRoot + ".instructors", {
              "abstract": true,
              "url": "/" + localizedUrls.instructors[languageCode],
              "template": "<ui-view/>"
            })
            .state(localisedRoot + ".instructors.list", {
              "url": "",
              "templateUrl": "/instructors/list.html"
            })
            .state(localisedRoot + ".instructors.detail", {
              "url": "/:key",
              "templateUrl": "/instructors/detail.html"
            });
        };

        // Default: Redirect to home (en)
        $urlRouterProvider.otherwise("/en");
        $locationProvider.html5Mode(true);
      }]);
