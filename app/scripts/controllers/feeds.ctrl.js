angular.module('rssfeed')
    .controller('FeedsCtrl', ['$scope', 'feedsFactory', function($scope, feedsFactory) {
    	$scope.title = '';
    	$scope.description = '';
    	$scope.feeds = [];

    	function getFeeds () {
    		feedsFactory.getFeeds().then(function (response) {
    			$scope.title = response.title;
    			$scope.description = response.description;
    			$scope.feeds = response.entries;
    		});
    	}

    	getFeeds();
    }]);