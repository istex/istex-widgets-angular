app.factory('istexResultsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        search: function(page) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;
            if($rootScope.currentFacetsURI){
                url= $rootScope.currentFacetsURI;
            }
            var from = "&from=";
            from+=page;
            url+= from;

            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        },
        defaultSearch: function(q) {

            // We create the url to call
            var url = $rootScope.istexConfigDefault.istexApi;
            url += "/document/?q=";
            var query = (q) ? q.toString() : "";
            url += (query !="") ? query : "*";
            url += "&output=*";
            url += "&stats=1";
            var facets = "&facet="+$rootScope.istexConfigDefault.facetsToLoad.join();
            var size = "&size="+$rootScope.istexConfigDefault.pageSize;
            url+= facets + size;

            // We save the url
            $rootScope.currentPageURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        }
    }
}]);