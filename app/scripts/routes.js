angular
    .module('rssfeed')
    .config(function($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/feeds', {
                templateUrl: 'views/feeds.html',
                controller: 'FeedsCtrl'
            })
            .when('/404', {
                templateUrl: 'views/404.html',                
            })
            .otherwise({
                redirectTo: '/'
            });

        // enable cors
        $httpProvider.defaults.useXDomain = true;
        // remove key from http header
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })