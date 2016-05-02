(function () {
  "use strict";

  angular
    .module("meeting")
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "supportedLanguages", "localizedRoutes",
      function($stateProvider, $urlRouterProvider, $locationProvider, supportedLanguages, localizedRoutes){

        var register = function(language, root, stateDefinition) {

          var state = angular.extend({}, stateDefinition);
          var stateName = (state.key) ? (root + "." + state.key) : root;

          // If the state does not have a specific url (which may be empty),
          // pick the localized url for it. In the case of the language root,
          // this will just be the language.
          if (typeof(state.url) === "undefined")
            state.url = (stateDefinition.urlParts)
              ? "/" + stateDefinition.urlParts[language]
              : language;

          state.language = language;

          $stateProvider.state(stateName, state);
          console.log(stateName, state.url, state.template, state.templateUrl);
        };

        // Application root
        $stateProvider.state("app", {
          "abstract": true,
          "url": "/",
          "template": "<ui-view/>"
        });

        // localised routes. These will be in the form app.en, app.it, etc.
        for (var i = 0; i < supportedLanguages.length; i++) {

          var languageCode = supportedLanguages[i];
          var localizedRoot = "app." + languageCode;

          // Declare routes.
          for (var routeDefinitionIndex = 0; routeDefinitionIndex < localizedRoutes.length; routeDefinitionIndex++) {
            var definition = localizedRoutes[routeDefinitionIndex];
            register(languageCode, localizedRoot, definition);
          }
        }

        // Default: Redirect to home (en)
        $urlRouterProvider.otherwise("/en");
        $locationProvider.html5Mode(true);
      }]);
})();
