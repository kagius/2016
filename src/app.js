(function () {
  "use strict";

  document.createElement( "picture" );
  
  angular
    .module("meeting", [ "ui.router", "pascalprecht.translate" ])
    .config(["$provide", function($provide) {
      $provide.constant("supportedLanguages", ["en", "it"]);
    }]);
})();
