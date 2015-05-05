app.controller('IstexresultsCtrl', ['$scope', '$rootScope', 'istexResultsService', function ($scope, $rootScope, istexResultsService) {

    $scope.selectPage = function(numPage){

        //$('.istex-results-items, .istex-results-items-stats').fadeTo( 100, 0 );
        $rootScope.hideResults = true;

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

                //$('.istex-results-items, .istex-results-items-stats').fadeTo( 100, 1 );
                $rootScope.hideResults = false;
            })
            .error(function (e) {
                console.error("ERROR : Pagination");
            });
    }

}]);