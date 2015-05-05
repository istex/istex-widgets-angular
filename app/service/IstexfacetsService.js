app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        corpusSearch: function(scope, listCorpus) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;
            var corpus = "&corpus=";
            function urlMaker(element, index, array) {
                if(element.isChecked){
                    corpus+=element.key+",";
                }
            }
            listCorpus.forEach(urlMaker);
            if (corpus != "&corpus=")
                corpus = corpus.substring(0, corpus.length - 1);
            else
                corpus="";
            url+= corpus;
            $rootScope.currentCorpusURI = corpus;

            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        }
    }
}]);