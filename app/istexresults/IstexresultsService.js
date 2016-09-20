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
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        },
        defaultSearch: function(q) {

            // We create the url to call
            var url = $rootScope.istexConfigDefault.istexApi;
            url += "/document/?q=";
            var query = (q) ? q.toString() : "";
            url += (query !="") ? query : "*";
            url += "&output=*";
            url += "&stats=1";
            if($rootScope.defaultSort){
                url += "&sortBy="+$rootScope.defaultSort;
            }else{
                url += "&sortBy="+$rootScope.istexConfigDefault.defaultSort;
            }
            var operator = "&defaultOperator="+$rootScope.istexConfigDefault.operator;
            
            var facets = "&facet="+$rootScope.istexConfigDefault.facetsToLoad.join();
            var size = "&size="+$rootScope.istexConfigDefault.pageSize;
            url += operator + facets + size + "&sid=istex-widgets";

            // We save the url
            $rootScope.currentPageURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        },
        sortedSearch: function(sort) {
            var defaultSort = $rootScope.istexConfigDefault.defaultSort;
            var sortByRegexp = /(&sortBy=)[a-zA-Z\[\],]*(&?)/;
            
            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI.replace(sortByRegexp, "$1"+sort+","+defaultSort+"$2");
            $rootScope.currentPageURI = url;
            if($rootScope.currentFacetsURI){
                url= $rootScope.currentFacetsURI.replace(sortByRegexp, "$1"+sort+","+defaultSort+"$2");
                $rootScope.currentFacetsURI = url;
            }

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        }
    }
}]);