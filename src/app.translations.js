angular
  .module("meeting")
  .config(["$translateProvider", function($translateProvider) {

    $translateProvider.useStaticFilesLoader({
      files: [{
          prefix: '/locales/locale-',
          suffix: '.json'
      }]
    });
    $translateProvider.useLoaderCache(true);
    $translateProvider.preferredLanguage('en');
}]);
