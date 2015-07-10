app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        facetSearch: function(scope, list) {

            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;

            var tmp;
            // corpusSearch
            var corpus = " AND corpusName:";
            function corpusMaker(element, index, array) {
                if(element.isChecked){
                    corpus+=element.key+",";
                }
            }
            function wosMaker(element, index, array) {
                if(element.isChecked){
                    wos+="\""+element.key.replace("&","%26")+"\",";
                }
            }
            function languageMaker(element, index, array) {
                if(element.isChecked){
                    language+=element.key+",";
                    if(element.key==="fr")
                        language+="fre,";
                    if(element.key==="en")
                        language+="eng,";
                }
            }
            if (list.corpusName)
                list.corpusName.buckets.forEach(corpusMaker);
            corpus = (corpus != " AND corpusName:") ? corpus.substring(0, corpus.length - 1) : corpus="";
            tmp = url.split("&");
            tmp[0] += corpus;
            url= (corpus!==" AND corpusName:") ? tmp.join("&") : url;

            var language = " AND language:";
            if (list.language)
                list.language.buckets.forEach(languageMaker);
            language = (language != " AND language:") ? language.substring(0, language.length - 1) : language="";
            tmp = url.split("&");
            tmp[0] += language;
            url= (language!==" AND language:") ? tmp.join("&") : url;

            var wos = " AND wos:(";
            if (list.wos)
                list.wos.buckets.forEach(wosMaker);
            wos = (wos != " AND wos:(") ? wos.substring(0, wos.length - 1)+")" : wos="";
            tmp = url.split("&");
            tmp[0] += wos;
            url= (wos!==" AND wos:") ? tmp.join("&") : url;

            // Function that creates the url part for range facets
            var facetURL="";
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

            if (list.publicationDate) {
                tmp = url.split("&");
                facetURL = rangeSlider("publicationDate", list.publicationDate);
                tmp[0] += facetURL;
                url = (facetURL && facetURL !== " AND publicationDate:[") ? tmp.join("&") : url;
            }

            // copyrightdateSearch
            if (list.copyrightDate) {
                tmp = url.split("&");
                facetURL = rangeSlider("copyrightDate", list.copyrightDate);
                tmp[0] += facetURL;
                url = (facetURL && facetURL !== " AND copyrightDate:[") ? tmp.join("&") : url;
            }

            // scoreSearch
            if (list.score) {
                tmp = url.split("&");
                facetURL = rangeSlider("score", list.score);
                tmp[0] += facetURL;
                url = (facetURL && facetURL !== " AND score:[") ? tmp.join("&") : url;
            }

            $rootScope.currentFacetsURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();

            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        }
    }
}]);