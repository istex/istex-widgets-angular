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
            if (list.corpus)
                list.corpus.buckets.forEach(urlMaker);
            corpus = (corpus != "&corpus=") ? corpus.substring(0, corpus.length - 1) : corpus="";
            url+= corpus;

            var bot;
            var top;

            // pubdateSearch
            var pubdate = " AND pubdate:[";
            if (list.pubdate){
                bot = parseInt(list.pubdate.buckets[0].bot);
                bot = (!isNaN(bot) && bot > parseInt(list.pubdate.buckets[0].from_as_string)) ? Math.floor(bot) : parseInt(list.pubdate.buckets[0].from_as_string) ;
                top = parseInt(list.pubdate.buckets[0].top);
                top = (!isNaN(top) && top < parseInt(list.pubdate.buckets[0].to_as_string)) ? Math.ceil(top) : parseInt(list.pubdate.buckets[0].to_as_string) ;

                if (bot > top){
                    var tmp = bot;
                    bot = top;
                    top = tmp;
                }
                if(!(bot == list.pubdate.buckets[0].from_as_string && top == list.pubdate.buckets[0].to_as_string))
                    pubdate += bot+' TO '+top+']';
            }
            tmp = url.split("&");
            tmp[0] += pubdate;
            url= (pubdate!==" AND pubdate:[") ? tmp.join("&") : url;

            // copyrightdateSearch
            var copyrightdate = " AND copyrightdate:[";
            if (list.copyrightdate){
                bot = parseInt(list.copyrightdate.buckets[0].bot);
                bot = (!isNaN(bot) && bot > parseInt(list.copyrightdate.buckets[0].from_as_string)) ? Math.floor(bot) : parseInt(list.copyrightdate.buckets[0].from_as_string) ;
                top = parseInt(list.copyrightdate.buckets[0].top);
                top = (!isNaN(top) && top < parseInt(list.copyrightdate.buckets[0].to_as_string)) ? Math.ceil(top) : parseInt(list.copyrightdate.buckets[0].to_as_string) ;

                if (bot > top){
                    tmp = bot;
                    bot = top;
                    top = tmp;
                }
                if(!(bot == list.copyrightdate.buckets[0].from_as_string && top == list.copyrightdate.buckets[0].to_as_string))
                    copyrightdate += bot+' TO '+top+']';
            }
            tmp = url.split("&");
            tmp[0] += copyrightdate;
            url= (copyrightdate!==" AND copyrightdate:[") ? tmp.join("&") : url;


            $rootScope.currentFacetsURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = performance.now();

            return $http.get(url);
        }
    }
}]);