angular.module('Volusion.services')
    .factory('tokenGenerator', [function () {
        'use strict';

        return {
            getCacheBustingToken: function () {
                var cacheBustingToken = (new Date()).valueOf();
                return { '_': cacheBustingToken };
            }
        };
    }]);
