app.factory('istexResultsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        search: function(page) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;
            if($rootScope.currentCorpusURI){
                url+= $rootScope.currentCorpusURI;
            }
            var from = "&from=";
            from+=page;
            url+= from;

            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        },
        advancedSearch: function(scope, options) {
            //return $http.post(rootpath+'/api/members/register', data);
        }
    }
}]);