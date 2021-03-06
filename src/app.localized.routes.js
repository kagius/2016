(function () {
  "use strict";
  angular
    .module("meeting").config(["$provide", function($provide) {

      $provide.constant("localizedRoutes", [
        // Localized root
        {
          "abstract": true,
          "template": "<ui-view/>",
          "controller": ["$rootScope", "$state", "$translate", function($rootScope, $state, $translate) {
            $rootScope.language = $state.current.language;
            $translate.use($state.current.language);

            $rootScope.localizeRoute = function(key, params) {
              return $state.href("app." + $rootScope.language + "." + key, params);
            };

            $rootScope.localizeCurrentRoute = function(languageCode) {
              return $state.href("app." + languageCode + "." + $state.current.key, $state.params);
            };
          }]
        },
        {
          "url": "",
          "key": "home",
          "templateUrl": "/home/home.html",
          "controller":"homeCtrl"
        },
        {
          "key": "instructors",
          "abstract": true,
          "template": "<ui-view/>",
          "urlParts":{
            "en": "instructors",
            "it": "insegnanti"
          }
        },
        {
          "key": "instructors.list",
          "url": "",
          "templateUrl": "/instructors/list.html",
          "controller": "instructorListCtrl"
        },
        {
          "url": "/:key",
          "key": "instructors.detail",
          "templateUrl": "/instructors/detail.html"
        }
      ]);
    }]);
})();
