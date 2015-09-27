angular.module('rssfeed')
    .controller('ModalInstanceCtrl', ['$scope', '$modal', '$modalInstance', 'feed', function($scope, $modal, $modalInstance, feed) {

        $scope.feed = feed;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);