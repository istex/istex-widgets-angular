app.directive('istexFacets', function () {
    return {
        template:'' +
        '<div id="istex-widget-facets" style="opacity: 1;" ng-controller="IstexfacetsCtrl" ng-toggle="showFacets && aggregations">'+
            '<div class="istex-facets">'+
                '<h3 class="istex-facets-title">Affiner votre recherche</h3>'+
                '<form class="istex-facets" >'+
                    '<div class="istex-facet" ng-repeat="(facetName, facet) in aggregations">' +
                        '<h4 class="istex-facet-name">{{ facetName | capitalize }}</h4>'+
                        '<div class="animate-switch-container" ng-switch on="facetName">'+
                            '<div class="istex-facet-{{ facetName }}" ng-switch-when="corpus">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key }}<span class="istex-facet-corpus-badge" >{{ badge.doc_count | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-{{ facetName }}" ng-switch-when="copyrightdate">' +
                                'Entre ' +
                                '<input type="number" min="{{ facet.buckets[0].from_as_string }}" max="{{ facet.buckets[0].to_as_string }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                ' et ' +
                                '<input type="number" min="{{ facet.buckets[0].from_as_string }}" max="{{ facet.buckets[0].to_as_string }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                '<span class="istex-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                            '</div>'+
                            '<div class="istex-facet-{{ facetName }}" ng-switch-when="pubdate">' +
                                'Entre ' +
                                '<input type="number" min="{{ facet.buckets[0].from_as_string }}" max="{{ facet.buckets[0].to_as_string }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                ' et ' +
                                '<input type="number" min="{{ facet.buckets[0].from_as_string }}" max="{{ facet.buckets[0].to_as_string }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                '<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                            '</div>'+
                            '<div class="istex-facet-{{ facetName }}" ng-switch-default>Default behavior</div>'+
                        '</div>'+
                    '</div>' +
                '</form>'+
            '</div>'+
        '</div>' +
        ''
    };
});