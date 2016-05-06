(function () {
  "use strict";

  angular
    .module("meeting")
    .config(["$translateProvider", "$translatePartialLoaderProvider", function($translateProvider, $translatePartialLoaderProvider) {

      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '/i18n/{part}/{lang}.json'
      });

      $translatePartialLoaderProvider.addPart('common');
      $translateProvider.useSanitizeValueStrategy(null);
      $translateProvider.useLoaderCache(true);
      $translateProvider.preferredLanguage('en');
  }]);
})();
