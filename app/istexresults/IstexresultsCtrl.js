app.controller('IstexresultsCtrl', ['$scope', '$rootScope', 'istexResultsService', function ($scope, $rootScope, istexResultsService) {

    $rootScope.showResults = false;

    console.log($rootScope.istexConfigDefault.labels);

    // If there is a default request to query on page loading we do it
    if($rootScope.istexConfigDefault.query !== false){
        istexResultsService.defaultSearch($rootScope.istexConfigDefault.query)
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

            })
            .error(function (e) {
                console.error("ERROR : Default Search");
            });
    }

    $scope.selectPage = function(numPage){

        var page = (numPage-1)*$rootScope.istexConfigDefault.pageSize;

        $rootScope.pageCourante = numPage;

        if ( ($rootScope.pageCourante >= 1+Math.ceil($rootScope.maxPagesInPagination/2)) && ($rootScope.pageCourante <= $rootScope.nbrPages - Math.ceil(($rootScope.maxPagesInPagination/2))) ){
            $rootScope.pageStart = $rootScope.pageCourante - (Math.floor($rootScope.maxPagesInPagination/2 -0.5));
            $rootScope.pageEnd = $rootScope.pageCourante + (Math.ceil($rootScope.maxPagesInPagination/2 -0.5));
        }else if($rootScope.pageCourante < 1+Math.ceil($rootScope.maxPagesInPagination/2)){
            $rootScope.pageStart = 1;
            $rootScope.pageEnd = $rootScope.maxPagesInPagination;
        }else if($rootScope.pageCourante > $rootScope.nbrPages - Math.ceil(($rootScope.maxPagesInPagination/2))){
            $rootScope.pageStart = $rootScope.nbrPages - $rootScope.maxPagesInPagination +1;
            $rootScope.pageEnd = $rootScope.nbrPages;
        }
        var tab = [];
        for (i = $rootScope.pageStart ; i <= $rootScope.pageEnd; i++) {
            tab.push({"id":i});
        }
        $rootScope.pages=tab;

        $rootScope.hideResults = true;
        $rootScope.hideStats = true;

        istexResultsService.search(page)
            .success(function (result) {
                // We calculate the time taken to make the search with facets
                $rootScope.searchTimeB = performance.now();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.elasticSearchTime=(result.stats['elasticsearch'].took/1000).toFixed(2);
                $rootScope.istexSearchTime=(result.stats['istex-api'].took/1000).toFixed(2);
                $rootScope.reseauSearchTime=($rootScope.totalSearchTime-$rootScope.elasticSearchTime-$rootScope.istexSearchTime).toFixed(2);

                $rootScope.documents = result.hits;
                $rootScope.nextPageURI = result.nextPageURI;

                $rootScope.hideResults = false;
                $rootScope.hideStats = false;
            })
            .error(function (e) {
                console.error("ERROR : Pagination");
            });
    }

}]);