angular.module('Volusion.decorators')
    .config(['$provide', 'config',
        function ($provide, config) {
            'use strict';
            var disableTranslations = config.ENV.DISABLE_TRANSLATIONS;
            $provide.decorator('translateDirective', ['$delegate', function ($delegate) {
                var directive = $delegate[0];

                if (disableTranslations) {
                    directive.compile = angular.noop;
                }

                return $delegate;
            }]);
        }]);
