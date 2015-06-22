app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        facetSearch: function(scope, list) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;

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

            var bot;
            var top;

            // pubdateSearch
            var pubdate = " AND publicationDate:[";
            if (list.publicationDate){
                bot = parseInt(list.publicationDate.buckets[0].bot);
                bot = (!isNaN(bot) && bot > parseInt(list.publicationDate.buckets[0].fromAsString)) ? Math.floor(bot) : parseInt(list.publicationDate.buckets[0].fromAsString) ;
                top = parseInt(list.publicationDate.buckets[0].top);
                top = (!isNaN(top) && top < parseInt(list.publicationDate.buckets[0].toAsString)) ? Math.ceil(top) : parseInt(list.publicationDate.buckets[0].toAsString) ;

                if (bot > top){
                    var tmp = bot;
                    bot = top;
                    top = tmp;
                }
                if(!(bot == list.publicationDate.buckets[0].fromAsString && top == list.publicationDate.buckets[0].toAsString))
                    pubdate += bot+' TO '+top+']';
            }
            tmp = url.split("&");
            tmp[0] += pubdate;
            url= (pubdate!==" AND publicationDate:[") ? tmp.join("&") : url;

            // copyrightdateSearch
            var copyrightdate = " AND copyrightDate:[";
            if (list.copyrightDate){
                bot = parseInt(list.copyrightDate.buckets[0].bot);
                bot = (!isNaN(bot) && bot > parseInt(list.copyrightDate.buckets[0].fromAsString)) ? Math.floor(bot) : parseInt(list.copyrightDate.buckets[0].fromAsString) ;
                top = parseInt(list.copyrightDate.buckets[0].top);
                top = (!isNaN(top) && top < parseInt(list.copyrightDate.buckets[0].toAsString)) ? Math.ceil(top) : parseInt(list.copyrightDate.buckets[0].toAsString) ;

                if (bot > top){
                    tmp = bot;
                    bot = top;
                    top = tmp;
                }
                if(!(bot == list.copyrightDate.buckets[0].fromAsString && top == list.copyrightDate.buckets[0].toAsString))
                    copyrightdate += bot+' TO '+top+']';
            }
            tmp = url.split("&");
            tmp[0] += copyrightdate;
            url= (copyrightdate!==" AND copyrightDate:[") ? tmp.join("&") : url;


            $rootScope.currentFacetsURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        }
    }
}]);