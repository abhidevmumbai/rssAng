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

        // Sanitize the feed
        function sanitizeFeedEntry (feedEntry) {
            var filteredContent = filterContent(feedEntry.content);

            feedEntry.author = $sce.trustAsHtml(feedEntry.author);
            feedEntry.categories = $sce.trustAsHtml(feedEntry.categories[0]);
            feedEntry.title = $sce.trustAsHtml(feedEntry.title);
            feedEntry.link = $sce.trustAsHtml(feedEntry.link);
            feedEntry.contentSnippet = $sce.trustAsHtml(feedEntry.contentSnippet);
            feedEntry.img = filteredContent.img;
            feedEntry.content = $sce.trustAsHtml(filteredContent.content);
            feedEntry.publishedDate = new Date(feedEntry.publishedDate).getTime();

            return feedEntry;
        }

        // Filter out media and content
        function filterContent (content) {
            var container = $('<div></div>').html(content),
                img = container.find('img'),
                src = '';

            if (img.length > 0) {
                src = 'http://www.toursfc.fr' + img.attr('src');
                img.remove();
            } else {
                src = 'images/default_thumbnail.jpg'
            }

            return {
                img: src,
                content: container.html()
            }
        }
        return {
    		getFeeds: getFeeds
    	}
    }]);