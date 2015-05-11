app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        facetSearch: function(scope, list) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;

            console.log(list);

            // corpusSearch
            var corpus = "&corpus=";
            function urlMaker(element, index, array) {
                if(element.isChecked){
                    corpus+=element.key+",";
                }
            }
            list.corpus.buckets.forEach(urlMaker);
            corpus = (corpus != "&corpus=") ? corpus.substring(0, corpus.length - 1) : corpus="";
            url+= corpus;
            $rootScope.currentCorpusURI = corpus;

            // pubdateSearch


            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        }
    }
}]);