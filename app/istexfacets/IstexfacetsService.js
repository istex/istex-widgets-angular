app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        facetSearch: function(scope, list) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;

            var tmp;
            // corpusSearch
            var corpus = " AND corpusName:";
            function urlMaker(element, index, array) {
                if(element.isChecked){
                    corpus+=element.key+",";
                }
            }
            if (list.corpusName)
                list.corpusName.buckets.forEach(urlMaker);
            corpus = (corpus != " AND corpusName:") ? corpus.substring(0, corpus.length - 1) : corpus="";
            tmp = url.split("&");
            tmp[0] += corpus;
            url= (corpus!==" AND corpusName:") ? tmp.join("&") : url;

            // Function that creates the url part for range facets
            var facetURL;
            var rangeSlider = function(facetName, facet, topValue, botValue){
                var bot;
                var top;
                var facetURL = " AND "+facetName+":[";
                if(!topValue)
                    topValue = parseInt(facet.buckets[0].toAsString);
                if(!botValue)
                    botValue = parseInt(facet.buckets[0].fromAsString);
                if (facet){
                    bot = parseInt(facet.buckets[0].bot);
                    bot = (!isNaN(bot) && bot > botValue) ? Math.floor(bot) : botValue ;
                    top = parseInt(facet.buckets[0].top);
                    top = (!isNaN(top) && top < topValue) ? Math.ceil(top) : topValue ;

                    if (bot > top){
                        var tmp = bot;
                        bot = top;
                        top = tmp;
                    }
                    if(!(bot == botValue && top == topValue))
                        facetURL += bot+' TO '+top+']';
                    return facetURL;
                }
            };

            // pubdateSearch
            tmp = url.split("&");
            facetURL = rangeSlider("publicationDate",list.publicationDate);
            tmp[0] += facetURL;
            url= (facetURL!==" AND publicationDate:[") ? tmp.join("&") : url;

            // copyrightdateSearch
            tmp = url.split("&");
            facetURL = rangeSlider("copyrightDate",list.copyrightDate);
            tmp[0] += facetURL;
            url= (facetURL!==" AND copyrightDate:[") ? tmp.join("&") : url;

            // scoreSearch
            tmp = url.split("&");
            facetURL = rangeSlider("score",list.score);
            tmp[0] += facetURL;
            url= (facetURL!==" AND score:[") ? tmp.join("&") : url;


            $rootScope.currentFacetsURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        }
    }
}]);