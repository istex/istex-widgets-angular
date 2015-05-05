app.controller('IstexsearchCtrl', ['$scope', '$rootScope', 'istexSearchService', function ($scope, $rootScope, istexSearchService) {

    $rootScope.showSearch = false;
    $rootScope.showFacets = false;

    $rootScope.numberResults = 4;

    $scope.search = function(){

        // While the query is being processed, we hide the old results
        //$('#istex-widget-results').fadeTo( 100, 0 );
        $rootScope.showSearch = false;
        $rootScope.showFacets = false;

        istexSearchService.search($scope)
            .success(function (result) {
                // We calculate the time taken to make the search
                $rootScope.searchTimeB = performance.now();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.elasticSearchTime=(result.stats['elasticsearch'].took/1000).toFixed(2);
                $rootScope.istexSearchTime=(result.stats['istex-api'].took/1000).toFixed(2);
                $rootScope.reseauSearchTime=($rootScope.totalSearchTime-$rootScope.elasticSearchTime-$rootScope.istexSearchTime).toFixed(2);

                // We associate the datas to the variables used in the directives with {{ }}
                $rootScope.documents = result.hits;
                $rootScope.total = result.total;
                $rootScope.nextPageURI = result.nextPageURI;
                $rootScope.aggregations = result.aggregations;

                // We allow results and facets to appear
                $rootScope.showSearch = true;
                $rootScope.showFacets = true;

                // We initialise the page system if there is one
                $rootScope.maxPagesInPagination = $rootScope.istexConfigDefault.maxPagesInPagination;
                $rootScope.nbrPages = Math.ceil($rootScope.total/$rootScope.istexConfigDefault.pageSize);
                $rootScope.firstPageURI = {"id":1};
                $rootScope.lastPageURI = {"id":$rootScope.nbrPages};
                if ($rootScope.nbrPages < $rootScope.maxPagesInPagination)
                    $rootScope.maxPagesInPagination = $rootScope.nbrPages;
                $rootScope.pageCourante = 1;
                var tab = [];
                for (i = 1; i <= $rootScope.maxPagesInPagination; i++) {
                    tab.push({"id":i});
                }
                $rootScope.pages=tab;

                //$('#istex-widget-results').fadeTo( 100, 1 );

            })
            .error(function (e) {
                console.error("ERROR : Search");
            });
    };
}]);