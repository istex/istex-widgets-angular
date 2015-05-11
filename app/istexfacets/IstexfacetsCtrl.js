app.controller('IstexfacetsCtrl', ['$scope', '$rootScope', '$timeout', 'istexFacetsService', function ($scope, $rootScope, $timeout, istexFacetsService) {

    $rootScope.showFacets = false;

    $scope.onChange = function($event) {
        $timeout(function() {
            angular.element($event.target.form).triggerHandler('submit');
        });
    };

    $scope.corpusSearch = function(listCorpus){

        $rootScope.showResults = false;

        istexFacetsService.corpusSearch($scope, listCorpus)
            .success(function (result) {
                // We calculate the time taken to make the search with facets
                $rootScope.searchTimeB = performance.now();
                $rootScope.totalSearchTime=(($rootScope.searchTimeB-$rootScope.searchTimeA)/1000).toFixed(2);
                $rootScope.elasticSearchTime=(result.stats['elasticsearch'].took/1000).toFixed(2);
                $rootScope.istexSearchTime=(result.stats['istex-api'].took/1000).toFixed(2);
                $rootScope.reseauSearchTime=($rootScope.totalSearchTime-$rootScope.elasticSearchTime-$rootScope.istexSearchTime).toFixed(2);

                $rootScope.documents = result.hits;
                $rootScope.total = result.total;
                $rootScope.nextPageURI = result.nextPageURI;

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

                $rootScope.showResults = true;

            })
            .error(function (e) {
                console.log("ERROR : Corpus Search");
            });
    };

}]);