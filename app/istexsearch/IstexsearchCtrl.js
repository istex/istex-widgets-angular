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

                    // We associate the data to the variables used in the directives with {{ }}
                    $rootScope.documents = result.hits;
                    $rootScope.total = result.total;
                    $rootScope.nextPageURI = result.nextPageURI;
                    $rootScope.aggregations = result.aggregations;
                    if ($rootScope.aggregations.publicationDate) {
                        $rootScope.aggregations.publicationDate.buckets[0].top = parseInt($rootScope.aggregations.publicationDate.buckets[0].toAsString);
                        $rootScope.aggregations.publicationDate.buckets[0].bot = parseInt($rootScope.aggregations.publicationDate.buckets[0].fromAsString);
                    }
                    if ($rootScope.aggregations.copyrightDate) {
                        $rootScope.aggregations.copyrightDate.buckets[0].top = parseInt($rootScope.aggregations.copyrightDate.buckets[0].toAsString);
                        $rootScope.aggregations.copyrightDate.buckets[0].bot = parseInt($rootScope.aggregations.copyrightDate.buckets[0].fromAsString);
                    }
                    if ($rootScope.aggregations.score) {
                        $rootScope.aggregations.score.buckets[0].top = 10;
                        $rootScope.aggregations.score.buckets[0].bot = 0;
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