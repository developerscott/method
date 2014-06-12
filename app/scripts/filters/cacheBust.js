// TODO: Determine who calls this, prune if not used.
function appendTokenToUrl(url, token) {
    'use strict';
    var separator = (url.indexOf('?') > -1) ? '&' : '?';
    return url + separator + '_=' + token;
}

angular.module('Volusion.filters')
    .filter('cacheBust', ['tokenGenerator',
        function (tokenGenerator) {
            'use strict';

            return  function (url) {
                if (!url || !url.trim()) {
                    return url;
                }
                return appendTokenToUrl(url, tokenGenerator.getCacheBustingToken()._);
            };
        }
    ]);
