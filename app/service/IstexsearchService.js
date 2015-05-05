app.factory('istexSearchService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        search: function(scope) {

            // We create the url to call
            var url = $rootScope.istexConfigDefault.istexApi;
            url += "/document/?q=";
            var query = (scope.query) ? scope.query.toString() : "";
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

            // We request the url => IstexsearchCtrl.istexSearchService.search()
            return $http.get(url);
        },
        advancedSearch: function(scope, options) {
            //return $http.post(rootpath+'/api/members/register', data);
        }
    }
}]);