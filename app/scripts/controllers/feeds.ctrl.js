angular.module('rssfeed')
    .controller('FeedsCtrl', ['$scope', '$modal', '$log', 'feedsFactory', function($scope, $modal, $log, feedsFactory) {
        $scope.title = '';
        $scope.description = '';
        $scope.feeds = [];

        // method to get feeds
        function getFeeds() {
            feedsFactory.getFeeds().then(function(response) {
                $scope.title = response.title;
                $scope.description = response.description;
                $scope.feeds = response.entries;
            });
        }

        // method to open feed details
        $scope.openDetails = function(ev, feed) {
        	ev.preventDefault();
        	console.log(feed);
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'views/feed-details.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    feed: function() {
                        return feed;
                    }
                }
            });

            modalInstance.result.then(function() {

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });

        }


        getFeeds();
    }]);