app.directive('istexFacets', function () {
    return {
        template:'' +
        '<div id="istex-widget-facets" style="opacity: 1;" ng-controller="IstexfacetsCtrl" ng-toggle="showFacets && aggregations">'+
            '<div class="istex-facets">'+
                '<h3 class="istex-facets-title">{{ istexConfigDefault.labels.facets["title"] || "Affiner votre recherche" }}</h3>'+
                '<div class="istex-facet" ng-repeat="(facetName, facet) in aggregations">' +
                    '<h4 class="istex-facet-name">{{ (istexConfigDefault.labels.facets[facetName] || facetName) | capitalize }}</h4>'+
                    '<div class="animate-switch-container" ng-switch on="facetName">'+
                        '<form class="istex-facet-{{ facetName }}" ng-submit="corpusSearch(facet.buckets)" ng-switch-when="corpus">'+
                            '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="onChange($event)">{{ badge.key }}<span class="istex-facet-corpus-badge" >{{ badge.doc_count | numberize }}</span></label></li>'+
                        '</form>'+
                        '<div class="animate-switch" ng-switch-when="copyrightdate">Copyrightdate : WIP</div>'+
                        '<div class="animate-switch" ng-switch-default>Default behavior</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>' +
        ''
    };
});