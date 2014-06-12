angular.module('Volusion.controllers')
    .controller('IndexCtrl', ['$state', '$location', '$scope', '$http', 'api', '$rootScope', 'tokenGenerator', 'cacheBustFilter',
        function ($state, $location, $scope, $http, api, $rootScope, tokenGenerator, cacheBustFilter) {
            'use strict';

            //hide header & footer when viewing theme-settings
            if ($location.path().indexOf('/theme-settings') >= 0) {
                $rootScope.hideWrapper = true;
            }

            $rootScope.seo = {};

            $scope.$on('$stateChangeSuccess', function (event, toState) {
                if (toState.name === 'i18n') {
                    $state.go('.home', null, { location: 'replace' });
                } else if (toState.name === 'i18n.home' && $scope.config) {
                    $rootScope.seo = angular.extend($rootScope.seo, $scope.config.seo);
                }
            });

            this.getThemeSettings = function () {
                $http.get(cacheBustFilter('/scripts/themeSettings.json'))
                    .success(function (data) {
                        console.log('themeSettings: ', data);
                        $rootScope.themeSettings = data;
                    });
            };

            this.getMenuItems = function () {
                // Nav
                api.navs.get({ navId: 1 }).then(function (response) {
                    $scope.categories = response.data;

                    // TODO: REMOVE
                    console.log('Categories: ', response.data);
                }, function (error) {
                    console.log('Error: ' + error);
                });
            };

            this.getConfig = function (callbackFn) {
                // Config
                api.config.get(tokenGenerator.getCacheBustingToken()).then(function (response) {
                    $scope.config = response.data;
                    angular.extend($rootScope.seo, $scope.config.seo);

                    // TODO: REMOVE
                    console.log('Config: ', response.data);

                    if (callbackFn) {
                        callbackFn($scope.config.checkout.cartId);
                    }

                }, function (error) {

                    console.log('Error: ', error);

                });
            };

            this.getCart = function (cartId) {
                // Carts
                api.carts.get({ cartId: cartId })
                    .then(function (response) {
                        $scope.cart = response.data;
                        // TODO: REMOVE
                        console.log('Cart: ', response.data);
                    }, function (error) {
                        console.log('Error: ', error);
                    });
            };

            this.getThemeSettings();

            this.getMenuItems();

            this.getConfig(this.getCart);

            $rootScope.viewCart = function () {
                if ($rootScope.isInDesktopMode) {
                    return '/shoppingcart.asp';
                } else {
                    return '/checkout.asp';
                }
            };

            // Add to Cart
            $rootScope.$on('ADD_TO_CART', function (event, args) {
                var pricing = args.pricing;
                var cartItem = {
                    id      : args.id,
                    code    : args.code,
                    name    : args.name,
                    options : args.options,
                    quantity: args.qty,
                    pricing : {
                        unitPrice     : pricing.salePrice > 0 ? pricing.salePrice : pricing.regularPrice,
                        recurringPrice: pricing.recurringPrice
                    }
                };

                api.carts.save({ cartId: $scope.cart.id || $scope.config.checkout.cartId }, cartItem)
                    .then(function (response) {

                        $scope.cart = response.data;
                        $rootScope.$emit('ITEM_ADDED_TO_CART');

                    });

            });
        }
    ]);
