app.directive('istexFacets', function () {
    return {
        template:'' +
        '<div id="istex-widget-facets" style="opacity: 1;" ng-controller="IstexfacetsCtrl" ng-toggle="showFacets && aggregations">'+
            '<div class="istex-facets">'+
                '<h3 class="istex-facets-title">{{ istexConfigDefault.labels.facets["title"] || "Affiner votre recherche" }}</h3>'+
                '<form class="istex-facets" >'+
                    '<div class="istex-facet" ng-repeat="(facetName, facet) in aggregations">' +
                        '<h4 class="istex-facet-name">{{ (istexConfigDefault.labels.facets[facetName] || facetName) | capitalize }}</h4>'+
                        '<div class="animate-switch-container" ng-switch on="facetName">'+
                            '<div class="istex-facet-corpus" ng-switch-when="corpusName">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key }}<span class="istex-facet-corpus-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-language" ng-switch-when="language">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key | languagize:istexConfigDefault.labels.facets["traduction"] }}<span class="istex-facet-language-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-wos" ng-switch-when="wos">'+
                                '<li ng-repeat="badge in facet.buckets"><label><input type="checkbox" ng-model="badge.isChecked" ng-click="submitFacetSearch(aggregations)">{{ badge.key  | capitalize }}<span class="istex-facet-wos-badge" >{{ badge.docCount | numberize }}</span></label></li>'+
                            '</div>'+
                            '<div class="istex-facet-copyrightdate" ng-switch-when="copyrightDate">' +
                                '<div ng-if="!istexConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="istex-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="istexConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="istex-facet-copyrightdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
                            '</div>'+
                            '<div class="istex-facet-pubdate" ng-switch-when="publicationDate">' +
                                '<div ng-if="!istexConfigDefault.slider">' +
                                    'Entre ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].bot" ng-change="submitFacetSearch(aggregations)" >' +
                                    ' et ' +
                                    '<input type="number" min="{{ facet.buckets[0].fromAsString }}" max="{{ facet.buckets[0].toAsString }}" ng-model="facet.buckets[0].top" ng-change="submitFacetSearch(aggregations)" >' +
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>' +
                                '<div ng-if="istexConfigDefault.slider">' +
                                    '<rzslider class="rzslider" rz-slider-floor="facet.buckets[0].fromAsString" rz-slider-ceil="facet.buckets[0].toAsString" rz-slider-model="facet.buckets[0].bot" rz-slider-high="facet.buckets[0].top" rz-slider-step="1" ></rzslider>'+
                                    //'<span class="istex-facet-pubdate-badge" >{{ facet.buckets[0].doc_count | numberize }}</span></label>' +
                                '</div>'+
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