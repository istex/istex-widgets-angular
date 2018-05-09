app.factory('istexFacetsService', ['$http', '$rootScope', function($http, $rootScope) {
    return {
        facetSearch: function(scope, list) {
            // We create the url to call, using the same Query for the basic search
            var url = $rootScope.currentPageURI;
            var tmp;
            var between = " OR ";
            var nbrCharBetween = between.length;
            
            // corpusSearch
            var corpus = " AND corpusName:(";
            function corpusMaker(element, index, array) {
                if(element.isChecked){
                    corpus+=element.key+between;
                }
            }
            function wosMaker(element, index, array) {
                if(element.isChecked){
                    wos+="\""+element.key.replace("&","%26")+"\""+between;
                }
            }
            function inistMaker(element, index, array) {
                if(element.isChecked){
                    inist+="\""+element.key.replace("&","%26")+"\""+between;
                }
            }
            function languageMaker(element, index, array) {
                if(element.isChecked){
                    language+=element.key+between;
                }
            }
            function genreMaker(element, index, array) {
                if(element.isChecked){
                    genre+=element.key+between;
                }
            }
            if (list.corpusName)
                list.corpusName.buckets.forEach(corpusMaker);
            corpus = (corpus != " AND corpusName:(") ? corpus.substring(0, corpus.length - nbrCharBetween)+")" : corpus="";
            tmp = url.split("&");
            tmp[0] += corpus;
            if(corpus){
                $rootScope.queriedFacets.corpusName = list.corpusName;
            }
            if(corpus!==" AND corpusName:("){
                url = tmp.join("&"); 
            }
            //url= (corpus!==" AND corpusName:(") ? tmp.join("&") : url;

            var language = " AND language:(";
            if (list.language)
                list.language.buckets.forEach(languageMaker);
            language = (language != " AND language:(") ? language.substring(0, language.length - nbrCharBetween)+")" : language="";
            tmp = url.split("&");
            tmp[0] += language
            
            if(language){
                $rootScope.queriedFacets.language = list.language;
            }
            if(language!==" AND language:("){
                url = tmp.join("&");
            }
            //url= (language!==" AND language:(") ? tmp.join("&") : url;

            var wos = " AND categories.wos:(";
            if (list["categories.wos"])
                list["categories.wos"].buckets.forEach(wosMaker);
            wos = (wos != " AND categories.wos:(") ? wos.substring(0, wos.length - nbrCharBetween)+")" : wos="";
            tmp = url.split("&");
            tmp[0] += wos;

            if(wos){                
                $rootScope.queriedFacets.wos = list["categories.wos"];
            }
            if(wos!==" AND categories.wos:("){
                url = tmp.join("&");
            }

            var inist = " AND categories.inist:(";
            if (list["categories.inist"])
                list["categories.inist"].buckets.forEach(inistMaker);
            inist = (inist != " AND categories.inist:(") ? inist.substring(0, inist.length - nbrCharBetween)+")" : inist="";
            tmp = url.split("&");
            tmp[0] += inist;

            if(inist){                
                $rootScope.queriedFacets.inist = list["categories.inist"];
            }
            if(inist!==" AND categories.inist:("){
                url = tmp.join("&");
            }

            
            var genre = " AND genre:(";
            if (list.genre)
                list.genre.buckets.forEach(genreMaker);
            genre = (genre != " AND genre:(") ? genre.substring(0, genre.length - nbrCharBetween)+")" : genre="";
            tmp = url.split("&");
            tmp[0] += genre
            
            if(genre){
                $rootScope.queriedFacets.genre = list.genre;
            }
            if(genre!==" AND genre:("){
                url = tmp.join("&");
            }

            // Function that creates the url part for range facets
            var facetURL="";
            var rangeSlider = function(facetName, facet, topValue, botValue){
                var bot;
                var top;
                var facetURL = " AND "+facetName+":[";
                if(!topValue)
                    topValue = parseInt(facet.buckets[0].toAsString) || facet.buckets[0].to;
                if(!botValue)
                    botValue = parseInt(facet.buckets[0].fromAsString) || facet.buckets[0].from;
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

                if(facetURL !== " AND publicationDate:["){
                    $rootScope.queriedFacets.publicationDate = list.publicationDate;
                }
                if(facetURL && facetURL !== " AND publicationDate:["){
                    url = tmp.join("&");
                }
                //url = (facetURL && facetURL !== " AND publicationDate:[") ? tmp.join("&") : url;
            }

            // copyrightdateSearch
            if (list.copyrightDate) {
                tmp = url.split("&");
                facetURL = rangeSlider("copyrightDate", list.copyrightDate);
                tmp[0] += facetURL;

                if(facetURL !== " AND copyrightDate:["){
                    $rootScope.queriedFacets.copyrightDate = list.copyrightDate;
                }
                if(facetURL && facetURL !== " AND copyrightDate:["){
                    url = tmp.join("&");
                }
                //url = (facetURL && facetURL !== " AND copyrightDate:[") ? tmp.join("&") : url;
            }

            // scoreSearch
            if (list.score) {
                tmp = url.split("&");
                
                facetURL = rangeSlider("qualityIndicators.score", list.score);
                
                tmp[0] += facetURL;

                if(facetURL !== " AND qualityIndicators.score:["){
                    $rootScope.queriedFacets.score = list.score;
                }
                if(facetURL && facetURL !== " AND qualityIndicators.score:["){
                    url = tmp.join("&");
                }

                //url = (facetURL && facetURL !== " AND score:[") ? tmp.join("&") : url;
            }
            $rootScope.currentFacetsURI = url;

            // We calculate the request time
            $rootScope.searchTimeA = new Date().getTime();
            return $http.jsonp(url+"&callback=JSON_CALLBACK");

        }
    }
}]);