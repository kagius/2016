(function () {
  "use strict";
  angular
    .module("meeting", [ "ui.router", "pascalprecht.translate" ])
    .config(["$provide", function($provide) {
      $provide.constant("supportedLanguages", ["en", "it"]);
    }]);
})();
