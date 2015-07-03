app.controller('IstexsearchCtrl', ['$scope', '$rootScope', 'istexSearchService', function ($scope, $rootScope, istexSearchService) {

    $rootScope.showAdvanced=false;

    $rootScope.showResults = false;

    if ($rootScope.istexConfigDefault.advancedToLoad)
        $scope.advancedQuery =$rootScope.istexConfigDefault.advancedToLoad;

    if($rootScope.istexConfigDefault.query !== false) {
        var q = $rootScope.istexConfigDefault.query;
        $rootScope.query = (q) ? q.toString() : "";
    }

    $scope.search = function(){

        // While the query is being processed, we hide the old results
        $rootScope.showResults = false;
        $rootScope.showFacets = false;

        istexSearchService.search($scope)
            .success(function (result) {
                // We calculate the time taken to make the search
                $rootScope.searchTimeB = new Date().getTime();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.noresult = (result.total ===0);
                if(!$rootScope.noresult) {
                    $rootScope.elasticSearchTime = (result.stats['elasticsearch'].took / 1000).toFixed(2);
                    $rootScope.istexSearchTime = (result.stats['istex-api'].took / 1000).toFixed(2);
                    $rootScope.reseauSearchTime = ($rootScope.totalSearchTime - $rootScope.elasticSearchTime - $rootScope.istexSearchTime).toFixed(2);

                    // We associate the datas to the variables used in the directives with {{ }}
                    $rootScope.documents = result.hits;
                    $rootScope.total = result.total;
                    $rootScope.nextPageURI = result.nextPageURI;
                    $rootScope.aggregations = result.aggregations;

                    // We mix en and eng languages as well as fr and fre !
                    var language = $rootScope.aggregations.language.buckets;
                    var fr, fre, en, eng;
                    for(var i=0; i < language.length; i++) {
                        switch(language[i].key) {
                         case "fr":
                             fr= language[i];
                             language.splice(i,1);
                             i-=1;
                            break;
                         case "fre":
                            fre= language[i];
                             language.splice(i,1);
                             i-=1;
                            break;
                         case "en":
                            en= language[i];
                             language.splice(i,1);
                             i-=1;
                            break;
                         case "eng":
                            eng= language[i];
                             language.splice(i,1);
                             i-=1;
                            break;
                         }
                     }
                    if(fre)
                        fr.docCount += fre.docCount;
                    if(eng)
                        en.docCount += eng.docCount;
                    if (language.length === 0 && fr)
                        language.push(fr);
                    if (language.length === 0 && en)
                        language.push(en);
                    for(var i=0; i < language.length; i++) {
                        if (language[i].docCount < fr.docCount) {
                            language.splice(i, 0, fr);
                            break;
                        }
                    }
                    for(var i=0; i < language.length; i++) {
                        if(language[i].docCount < en.docCount){
                            language.splice(i,0,en);
                            break;
                        }
                    }
                    //language.push(en,fr);
                    $rootScope.aggregations.language.buckets = language;

                    if ($rootScope.aggregations.publicationDate) {
                        $rootScope.aggregations.publicationDate.buckets[0].top = parseInt($rootScope.aggregations.publicationDate.buckets[0].toAsString);
                        $rootScope.aggregations.publicationDate.buckets[0].bot = parseInt($rootScope.aggregations.publicationDate.buckets[0].fromAsString);
                    }
                    if ($rootScope.aggregations.copyrightDate) {
                        $rootScope.aggregations.copyrightDate.buckets[0].top = parseInt($rootScope.aggregations.copyrightDate.buckets[0].toAsString);
                        $rootScope.aggregations.copyrightDate.buckets[0].bot = parseInt($rootScope.aggregations.copyrightDate.buckets[0].fromAsString);
                    }
                    // We initialise the page system if there is one
                    $rootScope.maxPagesInPagination = $rootScope.istexConfigDefault.maxPagesInPagination;
                    $rootScope.nbrPages = Math.ceil($rootScope.total / $rootScope.istexConfigDefault.pageSize);
                    $rootScope.firstPageURI = {"id": 1};
                    $rootScope.lastPageURI = {"id": $rootScope.nbrPages};
                    if ($rootScope.nbrPages < $rootScope.maxPagesInPagination)
                        $rootScope.maxPagesInPagination = $rootScope.nbrPages;
                    $rootScope.pageCourante = 1;
                    var tab = [];
                    for (i = 1; i <= $rootScope.maxPagesInPagination; i++) {
                        tab.push({"id": i});
                    }
                    $rootScope.pages = tab;
                    // We allow results and facets to appear
                    $rootScope.showResults = true;
                    $rootScope.showFacets = true;
                }

            })
            .error(function (e) {
                console.error("ERROR : Search");
                console.error(e);
            });
    };

    $scope.toggleAdvanced = function () {
        $rootScope.showAdvanced = !$rootScope.showAdvanced;
        if(!$rootScope.showAdvanced) {
            for (var prop in $scope.advancedQuery) {
                if (Object.prototype.hasOwnProperty.call($scope.advancedQuery, prop)) {
                    $scope.advancedQuery[prop] = "";
                }
            }
        }
    }

}]);