angular.module('rssfeed')
    .factory('feedsFactory', ['$http', '$location', '$q', '$sce', 'constants', function($http, $location, $q, $sce, constants) {
    	   
        function getFeeds () {
            var deferred = $q.defer(),
                feeds = {};
            $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(constants.api)).then(function (response) {
                feeds.title = response.data.responseData.feed.title;
                feeds.description = response.data.responseData.feed.description;
                feeds.entries = response.data.responseData.feed.entries;
                for (var i=0, len=feeds.entries.length; i < len; i++) {
                    feeds.entries[i] = sanitizeFeedEntry(feeds.entries[i]);
                }
                deferred.resolve(feeds);
            });

            return deferred.promise;
        }

        function sanitizeFeedEntry(feedEntry) {
            console.log('Before...');
            console.log(feedEntry);
            feedEntry.author = $sce.trustAsHtml(feedEntry.author);
            feedEntry.categories = $sce.trustAsHtml(feedEntry.categories[0]);
            feedEntry.title = $sce.trustAsHtml(feedEntry.title);
            feedEntry.link = $sce.trustAsHtml(feedEntry.link);
            feedEntry.contentSnippet = $sce.trustAsHtml(feedEntry.contentSnippet);
            feedEntry.content = $sce.trustAsHtml(feedEntry.content);
            feedEntry.publishedDate = new Date(feedEntry.publishedDate).getTime();
            console.log('After...');
            console.log(feedEntry);
            return feedEntry;
        }
        return {
    		getFeeds: getFeeds
    	}
    }]);