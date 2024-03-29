'use strict';

angular.module('volusion.decorators')
  .config(['$provide', 'config', function ($provide, config) {
    var disableTranslations = config.ENV.DISABLE_TRANSLATIONS;
    $provide.decorator('translateDirective', ['$delegate', function($delegate) {
      var directive = $delegate[0];

      if (disableTranslations) {
        directive.compile = angular.noop;
      }

      return $delegate;
    }]);
  }]);
